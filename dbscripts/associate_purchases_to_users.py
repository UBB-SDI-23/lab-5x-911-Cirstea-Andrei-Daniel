import associate_to_users

if __name__ == '__main__':
    associate_to_users.associate(1000000, "update_purchase_users.sql", "purchase", "purchaseid_pk")