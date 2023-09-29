-- seedPlants.sql

-- Start with deleting existing records to avoid duplication
DELETE FROM listplants WHERE plant_id IN (SELECT id FROM plants);
DELETE FROM plants;

-- Insert plants
INSERT INTO plants (common_name, scientific_name, watering, sunlight, description, zoning, icon_path)
VALUES 
('Strawberry', 'Fragaria × ananassa', 'Moderate', 'Full Sun', 'Strawberries are delicious fruits.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/strawberry.jpg'),
('Corn', 'Zea mays', 'Average', 'Full Sun', 'Corn is a cereal grain.', '2-11', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/corn.jpg'),
('Tomato', 'Solanum lycopersicum', 'Moderate', 'Full Sun', 'Tomatoes are versatile fruits.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/tomatoes.jpg'),
('Cucumber', 'Cucumis sativus', 'Frequent', 'Full Sun', 'Cucumbers are cool and crispy.', '4-12', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/cucumber.jpg'),
('Carrot', 'Daucus carota', 'Light', 'Full Sun', 'Carrots are root vegetables, usually orange in color.', '3-10', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/carrot.jpg'),
('Broccoli', 'Brassica oleracea', 'Moderate', 'Full Sun', 'Broccoli is an edible green plant in the cabbage family.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/broccoli.jpg'),
('Lettuce', 'Lactuca sativa', 'Frequent', 'Partial Shade', 'Lettuce is an annual plant of the daisy family.', '4-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/lettuce.jpg'),
('Spinach', 'Spinacia oleracea', 'Moderate', 'Partial Shade', 'Spinach is a leafy green flowering plant.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/spinach.jpg'),
('Pepper', 'Capsicum annuum', 'Moderate', 'Full Sun', 'Peppers are spicy fruits.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/pepper.jpg'),
('Eggplant', 'Solanum melongena', 'Moderate', 'Full Sun', 'Eggplants are purple, soft vegetables.', '4-10', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/eggplant.jpg'),
('Potato', 'Solanum tuberosum', 'Moderate', 'Full Sun', 'Potatoes are starchy tubers.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/potatoes.jpg'),
('Okra', 'Abelmoschus esculentus', 'Moderate', 'Full Sun', 'Okra is a flowering plant in the mallow family.', '4-11', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/okra.jpg'),
('Blueberry', 'Vaccinium corymbosum', 'Frequent', 'Full Sun', 'Blueberries are sweet, nutritious fruits.', '3-7', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/blueberry.jpg'),
('Raspberry', 'Rubus idaeus', 'Frequent', 'Full Sun', 'Raspberries are sweet, nutritious fruits.', '3-9', 'https://raw.githubusercontent.com/Zanuv/plantimages/main/raspberries.jpg');
