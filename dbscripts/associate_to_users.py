if __name__ == '__main__':
    pass
    
def associate(count, filename, table_name, id_column_name):
    from faker import Faker
    fake = Faker()
    
    lines = []
    
    sql_initial_delete_string = "DELETE FROM temp_table;\n"
    sql_start_string = "INSERT INTO temp_table (id, user_id) VALUES\n"
    sql_update_statement = "UPDATE " + table_name + " UT SET userid_fk = (SELECT T.user_id FROM temp_table T WHERE UT." + id_column_name + " = T.id)"
    
    for i in range(count):
        user_id = fake.random_int(min=0, max=9999)
        id = i
        
        if (i % 10000) == 0:
            print(i)
        
        lines.append("('{}', '{}')".format(id, user_id))
        if ((i + 1) % 1000) != 0:
            lines[i] += ",\n"
    
    with open(filename, 'w') as f:
        f.write(sql_initial_delete_string)
        iteration_count = int(count / 1000)
        for i in range(iteration_count):
            f.write(sql_start_string)
            offset = i * 1000
            for j in range(0, 1000):
                f.write(lines[offset + j])
            f.write(";")
        f.write(sql_update_statement)
    