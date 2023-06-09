if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    COUNT = 10000000
    MAX_COUNT_FK = 1000000   
    MAX_USER_ID = 10000 - 1
    
    sql_start_string = "INSERT INTO cars_on_purchase (cars_on_purchaseid, count, priority, car_modelid_fk, purchaseid_fk, userid_fk) VALUES\n"
    
    # write SQL statements to file in /tmp directory
    with open(r'insert_cars_on_purchase.sql', 'w') as f:
        generated_pairs = {}

        iteration_count = int(COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            
            # generate fake data and create INSERT SQL statements
            for j in range(1000):
                count = fake.random_int(min=1, max=20)
                priority = fake.random_int(min=1, max=5)
                
                while True:
                    car_model_fk = fake.random_int(min=0, max=MAX_COUNT_FK - 1)
                    purchase_fk = fake.random_int(min=0, max=MAX_COUNT_FK - 1)
                    user_id = fake.random_int(0, MAX_USER_ID)
                    
                    #existing_pair = generated_pairs.get((car_model_fk, purchase_fk), None)
                    #if existing_pair is None:    
                    id = offset + j
                    
                    if (id % 10000) == 0:
                        print(id)
                    
                    f.write("('{}', '{}', '{}', '{}', '{}', '{}')".format(id, count, priority, car_model_fk, purchase_fk, user_id))
                    if ((j + 1) % 1000) != 0:
                        f.write(",\n")
                        
                    #generated_pairs[(car_model_fk, purchase_fk)] = None
                    break
            f.write(";")
            
        f.write("ALTER SEQUENCE cars_on_purchase_seq RESTART WITH 10000000;")
    