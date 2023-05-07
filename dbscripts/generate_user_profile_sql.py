if __name__ == '__main__':
    from faker import Faker
    fake = Faker()
    
    COUNT = 10000
    
    genders = fake.random_elements(elements=[
        'Male',
        'Female'
    ], length=COUNT, unique=False)
    
    sql_start_string = "INSERT INTO user_profile (user_profileid, birthday, description, gender, location, phone_number, user_id) VALUES\n"

    # create list to store SQL statements
    lines = []

    # generate fake data and create INSERT SQL statements
    for i in range(COUNT):
        birthday = fake.date_of_birth()
        description = fake.paragraph(5)
        gender = genders[i]
        location = fake.street_address()
        phone_number = fake.phone_number()
        id = i
        user_id = i
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(id, birthday, description, gender, location, phone_number, user_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"

    # write SQL statements to file in /tmp directory
    with open(r'insert_user_profile.sql', 'w') as f:
        iteration_count = int(COUNT / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write("ALTER SEQUENCE user_profile_seq RESTART WITH 10001;")