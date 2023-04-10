if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    sql_start_string = "INSERT INTO "

    # create list to store SQL statements
    sqls = []

    # generate fake data and create INSERT SQL statements
    for i in range(100):
        name = fake.name()
        manufacturer = fake.email()
        price = fake.random_int(min=10000, max=100000)
        fuel_consumption = fake.random_int(min=1, max=50)
        manufacture_year = fake.random_int(min=2005, max=2023)
        
        sql = "INSERT INTO car_model (model, manufacturer, manufacture_year, price, fuel_consumption) VALUES ('{}', '{}', '{}', '{}', '{}')".format(name, manufacturer, manufacture_year, price, fuel_consumption)
        sqls.append(sql)

    # write SQL statements to file in /tmp directory
    with open(r'insert.sql', 'w') as f:
        for i, sql in enumerate(sqls):
            f.write(sql + '\n')
            print('Inserted record {} of 100'.format(i + 1))