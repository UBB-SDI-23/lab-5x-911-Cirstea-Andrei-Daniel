if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    sql_start_string = "INSERT INTO "

    # create list to store SQL statements
    sqls = []

    # generate fake data and create INSERT SQL statements
    for i in range(100):
        name = fake.name()
        email = fake.email()
        price = fake.random_int(min=10000, max=100000)
        fuel_consumption = fake.random_int(min=1, max=50)
        
        sql = "INSERT INTO car_model (model, manufacturer, price, fuel consumption) VALUES ('{}', '{}', '{}', '{}')".format(name, email, price, fuel_consumption)
        sqls.append(sql)

    # write SQL statements to file in /tmp directory
    with open(r'insert.sql', 'w') as f:
        for i, sql in enumerate(sqls):
            f.write(sql + '\n')
            print('Inserted record {} of 100'.format(i + 1))