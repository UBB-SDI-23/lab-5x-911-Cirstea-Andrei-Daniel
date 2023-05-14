if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    CUSTOMERS_COUNT = 1000000
    MAX_USER_ID = 10000 - 1
    
    priorities = fake.random_elements(elements=[
        'Regular',
        'Pro',
        'Premium',
        'VIP'
        ], length=CUSTOMERS_COUNT, unique=False)
    
    sql_start_string = "INSERT INTO customer (customerid, first_name, last_name, email_address, telephone_number, priority, userid_fk) VALUES\n"

    # create list to store SQL statements
    lines = []

    # generate fake data and create INSERT SQL statements
    for i in range(CUSTOMERS_COUNT):
        first_name = fake.first_name()
        last_name = fake.last_name()
        telephone_number = fake.phone_number()
        email = fake.email()
        id = i
        user_id = fake.random_int(0, MAX_USER_ID)
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(id, first_name, last_name, email, telephone_number, priorities[i], user_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'insert_customer.sql', 'w') as f:
        iteration_count = int(CUSTOMERS_COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write("ALTER SEQUENCE customer_seq RESTART WITH 10000000;")