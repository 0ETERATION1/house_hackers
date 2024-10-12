import csv
import random

# Read the original CSV file
input_file = 'ML/Data/ZIP_Codes.csv'
output_file = 'ML/Data/fake_zipcode_data.csv'

# Prepare output data
output_data = [['ZIPCODE', 'ZIPCITY', 'SchoolRating', 'NumHospitals', 'AvgHomePrice']]

# Read input CSV and generate fake data
with open(input_file, 'r') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip header
    for row in reader:
        zipcode = row[1]
        zipcity = row[2]
        school_rating = random.randint(1, 10)
        num_hospitals = random.randint(0, 5)
        avg_home_price = random.randint(200000, 1000000)
        
        output_data.append([zipcode, zipcity, school_rating, num_hospitals, avg_home_price])

# Write to CSV file
with open(output_file, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(output_data)

print(f"Fake data CSV file '{output_file}' has been created.")
