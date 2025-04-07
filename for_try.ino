#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>

#define moistureSensorPin1 34
#define pumpPin1 14

const char *ssid = "HUAWEI-2.4G-H8Vw";
const char *password = "q2PuvNav";

WebServer server(80);

bool pump1Status = false;
bool autoMode = true;

void handleFileRequest(String path) {
    if (path.endsWith("/")) path += "index.html";
    String contentType = "text/plain";
    
    if (path.endsWith(".html")) contentType = "text/html";
    else if (path.endsWith(".css")) contentType = "text/css";
    else if (path.endsWith(".js")) contentType = "application/javascript";

    File file = SPIFFS.open(path, "r");
    if (!file) {
        server.send(404, "text/plain", "File Not Found");
        return;
    }
    server.streamFile(file, contentType);
    file.close();
}

void handleData() {
    int moistureLevel = analogRead(moistureSensorPin1);
    Serial.println("Raw Moisture Reading: " + String(moistureLevel));

    // Replace 1200 and 3600 with your actual min/max
    int moisturePercentage = map(moistureLevel, 850, 2200, 100, 0);
    moisturePercentage = constrain(moisturePercentage, 0, 100);

    if (autoMode) {
        if (moisturePercentage < 35) pump1Status = true;
        if (moisturePercentage > 50) pump1Status = false;
        digitalWrite(pumpPin1, pump1Status ? HIGH : LOW);
    }

    String json = "{\"moisture\":" + String(moisturePercentage) +
                  ", \"pump\":" + String(pump1Status) +
                  ", \"autoMode\":" + String(autoMode) + "}";
    server.send(200, "application/json", json);
}


void handleTogglePump() {
    if (!autoMode) {
        pump1Status = !pump1Status;
        digitalWrite(pumpPin1, pump1Status ? HIGH : LOW);
    }
    server.sendHeader("Location", "/", true);
    server.send(303);
}

void handleToggleMode() {
    autoMode = !autoMode;
    if (autoMode) {
        pump1Status = false;
        digitalWrite(pumpPin1, LOW);
    }
    server.sendHeader("Location", "/", true);
    server.send(303);
}

void setup() {
    Serial.begin(115200);
    pinMode(pumpPin1, OUTPUT);
    digitalWrite(pumpPin1, LOW);

    if (!SPIFFS.begin(true)) {
        Serial.println("SPIFFS Mount Failed");
        return;
    }

    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected.");
    Serial.println(WiFi.localIP());

    server.on("/", []() { handleFileRequest("/index.html"); });
    server.on("/style.css", []() { handleFileRequest("/style.css"); });
    server.on("/script.js", []() { handleFileRequest("/script.js"); });

    server.on("/togglePump", handleTogglePump);
    server.on("/toggleMode", handleToggleMode);
    server.on("/data", handleData);

    server.begin();
}

void loop() {
    server.handleClient();
}
