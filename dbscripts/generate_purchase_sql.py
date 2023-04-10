if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    COUNT = 1000000
    
    pay_methods = fake.random_elements(
        elements=["CreditCard", "PayPal", "Cash", "DebitCard", "BankTransfer"],
        length=COUNT, unique=False)
    
    statuses = fake.random_elements(
        elements=["Completed", "Pending", "Failed"],
        length=COUNT, unique=False)
    
    sql_start_string = "INSERT INTO purchase (purchaseid_pk, date, pay_method, status, customerid_fk) VALUES\n"

    # create list to store SQL statements
    lines = []

    # generate fake data and create INSERT SQL statements
    for i in range(COUNT):
        name = fake.name()
        date = fake.date()
        contact_email = fake.email()
        customer_id = fake.random_int(min=0, max=COUNT)
        id = i
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', '{}')".format(id, date, pay_methods[i], statuses[i], customer_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'/tmp/insert_purchase.sql', 'w') as f:
        iteration_count = int(COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")