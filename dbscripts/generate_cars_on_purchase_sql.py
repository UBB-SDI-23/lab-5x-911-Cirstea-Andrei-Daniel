if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    COUNT = 1000
    MAX_COUNT_FK = 1000000
    
    sql_start_string = "INSERT INTO cars_on_purchase (cars_on_purchaseid, count, priority, car_modelid_fk, purchaseid_fk) VALUES\n"

    # create list to store SQL statements
    lines = []
    
    generated_pairs = {}

    # generate fake data and create INSERT SQL statements
    for i in range(COUNT):
        count = fake.random_int(min=1, max=20)
        priority = fake.random_int(min=1, max=5)
        
        while True:
            car_model_fk = fake.random_int(min=0, max=MAX_COUNT_FK)
            purchase_fk = fake.random_int(min=0, max=MAX_COUNT_FK)
            
            existing_pair = generated_pairs.get((car_model_fk, purchase_fk), None)
            if existing_pair is None:    
                id = i
                
                if (i % 10000) == 0:
                    print(i)
                
                lines.append("('{}', '{}', '{}', '{}', '{}')".format(id, count, priority, car_model_fk, purchase_fk))
                if ((i + 1) % 1000) != 0:
                    lines[i] += ",\n"
                    
                generated_pairs[(car_model_fk, purchase_fk)] = None
                break

    # write SQL statements to file in /tmp directory
    with open(r'insert_cars_on_purchase.sql', 'w') as f:
        iteration_count = int(COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
            
        f.write("ALTER SEQUENCE car_model_seq RESTART WITH 10000000;")