if __name__ == '__main__':
    from faker import Faker
    from passlib.hash import sha256_crypt
    fake = Faker()
    
    GENERATE_COUNT = 10000
    
    sql_start_string = "INSERT INTO user_table (userid, email, password, username, enabled, role_roleid) VALUES\n"

    # create list to store SQL statements
    lines = []
    
    # Generate a random password
    password = fake.password()

    # Hash the password using SHA-256
    hashed_password = sha256_crypt.hash(password)

    # generate fake data and create INSERT SQL statements
    for i in range(GENERATE_COUNT):
        username = fake.user_name()
        
        email = fake.email()
        id = i
        
        if (i % 1000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', {}, {})".format(id, email, hashed_password, username, "TRUE", 0))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'insert_user.sql', 'w') as f:
        iteration_count = int(GENERATE_COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write("ALTER SEQUENCE user_table_seq RESTART WITH 10001;")