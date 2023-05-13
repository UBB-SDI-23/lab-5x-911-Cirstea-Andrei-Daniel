if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    GENERATE_COUNT = 1000000
    MAX_USER_ID = 10000 - 1
    
    models = fake.random_elements(
        elements=['Accord', 'Acura', 'Altima', 'Armada', 'Avalanche', 'Aveo', 'Azera', 'Beetle', 'Cadenza', 'Camaro', 
              'Camry', 'Canyon', 'Caprice', 'Carrera', 'Challenger', 'Charger', 'Civic', 'CL-Class', 'Colorado', 
              'Compass', 'Continental', 'Cooper', 'Corolla', 'Corvette', 'CR-V', 'Crosstour', 'Cruze', 'CTS', 
              'Cube', 'CX-5', 'CX-9', 'Dart', 'Durango', 'E-Class', 'Eclipse', 'Edge', 'Elantra', 'Enclave', 
              'Encore', 'Endeavor', 'Equinox', 'Escape', 'Esperante', 'Explorer', 'F-150', 'Fiesta', 'Fit', 
              'Focus', 'Forester', 'Forte', 'Fusion', 'G-Class', 'Galant', 'Genesis', 'Ghibli', 'GL-Class', 
              'GLA-Class', 'GLC-Class', 'GLE-Class', 'GLK-Class', 'Golf', 'GranTurismo', 'GT-R', 'H2', 'H3', 
              'HHR', 'Highlander', 'HR-V', 'ILX', 'Impala', 'Impreza', 'Insight', 'IS', 'Jetta', 'Journey', 
              'Juke', 'K900', 'LaCrosse', 'Lancer', 'Legacy', 'Levante', 'LX', 'M-Class', 'M3', 'M4', 'M5', 
              'M6', 'Malibu', 'Maxima', 'Mazda2', 'Mazda3', 'Mazda5', 'Mazda6', 'MDX', 'Mirage', 'Model S', 
              'Model X', 'Murano', 'Mustang', 'Navigator', 'Odyssey', 'Optima', 'Outback', 'Outlander', 
              'Pacifica', 'Panamera', 'Passat', 'Pathfinder', 'Pilot', 'Prius', 'Q3', 'Q5', 'Q7', 'Q50', 
              'Q60', 'Q70', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80', 'R8', 'RAV4', 'RC', 'Rio', 'RLX', 
              'Rogue', 'RX', 'S-Class', 'S4', 'S5', 'S6', 'S7', 'S8', 'Santa Fe', 'Sebring', 'Sentra', 
              'Sienna', 'Silverado', 'Sonic', 'Sonata', 'Sorento', 'Soul', 'Spark', 'Sportage', 'SRX', 
              'STS', 'Suburban', 'Tacoma', 'Tahoe', 'Taurus', 'Terrain', 'Tiguan', 'Titan', 'TLX', 'Torino', 
              'Town & Country', 'Tribeca', 'Traverse', 'Tucson', 'Tundra', 'Vantage', 'Veloster', 'Veracruz', 
              'Versa', 'Volt', 'Wrangler', 'X1', 'X3', 'X4', 'X5'
        ], length=GENERATE_COUNT, unique=False)
    
    manufacturers = fake.random_elements(elements=[
        'Audi',
        'BMW',
        'Chevrolet', 
        'Chrysler', 
        'Dodge', 
        'Ford', 
        'Honda', 
        'Hyundai',
        'Jaguar', 
        'Jeep',
        'Kia', 
        'Lexus', 
        'Mazda', 
        'Mercedes-Benz',
        'Nissan', 
        'Porsche', 
        'Subaru', 
        'Tesla', 
        'Toyota', 
        'Volkswagen'
        ], length=GENERATE_COUNT, unique=False)
    
    sql_start_string = "INSERT INTO car_model (carid, model, manufacturer, manufacture_year, price, fuel_consumption, description, userid_fk) VALUES\n"

    # create list to store SQL statements
    lines = []

    # generate fake data and create INSERT SQL statements
    for i in range(GENERATE_COUNT):
        price = fake.random_int(min=10000, max=100000)
        fuel_consumption = fake.random_int(min=1, max=50)
        manufacture_year = fake.random_int(min=2005, max=2023)
        description = fake.paragraph(3)
        user_id = fake.random_int(0, MAX_USER_ID)
        id = i
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(id, models[i], manufacturers[i], manufacture_year, price,
                                                                               fuel_consumption, description, user_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'insert_car_model.sql', 'w') as f:
        iteration_count = int(GENERATE_COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write("ALTER SEQUENCE car_model_seq RESTART WITH 10000000;")