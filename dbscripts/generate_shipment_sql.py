if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    COUNT = 1000000
    MAX_USER_ID = 10000 - 1
    
    sql_start_string = "INSERT INTO shipment (shipmentid, expected_arrival, arrival, total_price, distributorid_fk, userid_fk) VALUES\n"

    # create list to store SQL statements
    lines = []

    # generate fake data and create INSERT SQL statements
    for i in range(COUNT):
        expected_arrival = fake.date()
        arrival = fake.date()
        total_price = fake.random_int(min=10000, max=10000000 - 1)
        distributor_fk = fake.random_int(min=0, max=1000000 - 1)
        id = i
        user_id = fake.random_int(0, MAX_USER_ID)
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', '{}', '{}')".format(id, expected_arrival, arrival, total_price, distributor_fk, user_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'insert_shipment.sql', 'w') as f:
        iteration_count = int(COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write("ALTER SEQUENCE shipment_seq RESTART WITH 10000000;")