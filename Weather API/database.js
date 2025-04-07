const plantDatabase = {
    "plants": [
      {
        "name": "Tomato",
        "category": "Vegetable",
        "water_ml_per_watering": 500,
        "fertilizer_ml_per_week": 10,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Red Chili (Siling Labuyo)",
        "category": "Vegetable",
        "water_ml_per_watering": 300,
        "fertilizer_ml_per_week": 8,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Calamansi",
        "category": "Citrus",
        "water_ml_per_watering": 600,
        "fertilizer_ml_per_week": 12,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Eggplant (Talong)",
        "category": "Vegetable",
        "water_ml_per_watering": 600,
        "fertilizer_ml_per_week": 12,
        "ideal_moisture_range": "50-75%"
      },
      {
        "name": "Okra",
        "category": "Vegetable",
        "water_ml_per_watering": 500,
        "fertilizer_ml_per_week": 10,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Pechay (Bok Choy)",
        "category": "Vegetable",
        "water_ml_per_watering": 300,
        "fertilizer_ml_per_week": 8,
        "ideal_moisture_range": "40-60%"
      },
      {
        "name": "Lettuce",
        "category": "Vegetable",
        "water_ml_per_watering": 200,
        "fertilizer_ml_per_week": 5,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Red Bell Pepper",
        "category": "Vegetable",
        "water_ml_per_watering": 400,
        "fertilizer_ml_per_week": 10,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Green Chili",
        "category": "Vegetable",
        "water_ml_per_watering": 300,
        "fertilizer_ml_per_week": 8,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Spinach",
        "category": "Vegetable",
        "water_ml_per_watering": 200,
        "fertilizer_ml_per_week": 4,
        "ideal_moisture_range": "40-60%"
      },
      {
        "name": "Aloe Vera",
        "category": "Display",
        "water_ml_per_watering": 200,
        "fertilizer_ml_per_week": 3,
        "ideal_moisture_range": "30-50%"
      },
      {
        "name": "Snake Plant",
        "category": "Display",
        "water_ml_per_watering": 150,
        "fertilizer_ml_per_week": 2,
        "ideal_moisture_range": "30-50%"
      },
      {
        "name": "Cypress",
        "category": "Display",
        "water_ml_per_watering": 250,
        "fertilizer_ml_per_week": 4,
        "ideal_moisture_range": "40-60%"
      },
      {
        "name": "Hibiscus",
        "category": "Display",
        "water_ml_per_watering": 400,
        "fertilizer_ml_per_week": 8,
        "ideal_moisture_range": "50-70%"
      },
      {
        "name": "Bougainvillea",
        "category": "Display",
        "water_ml_per_watering": 300,
        "fertilizer_ml_per_week": 6,
        "ideal_moisture_range": "40-60%"
      }
    ],
    "calculateWatering": function(moistureDropPercentage, baseWater) {
        return baseWater * (moistureDropPercentage / 100);
    },
    "adjustWateringByWeather": function(baseWater, currentTemp, currentHumidity) {
        let tempFactor = 1 + (35 - currentTemp) / 100;
        let humidityFactor = currentHumidity < 50 ? 1.2 : (currentHumidity > 70 ? 0.8 : 1);
        return baseWater * tempFactor * humidityFactor;
    }
};
