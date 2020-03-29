import csv
import json
# with open('./TR.csv') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter=';')
#     line_count = 0
#     x = []
#     y = []
#     for row in csv_reader:
#         x = x+ [float(row[0])]
#         y = y+ [float(row[1])]
# trace = {"x": x, "y":y}
# jsontrace = json.dumps(trace)
# print(jsontrace)
# with open('TR.json', 'w') as outfile:
#     json.dump(jsontrace, outfile)

with open('./TR.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    line_count = 0
    x = []
    for row in csv_reader:
        x = x+ [[float(row[0]),float(row[1])]]
trace = {"points": x}
jsontrace = json.dumps(trace)
print(jsontrace)
with open('TR2.js', 'w') as outfile:
    json.dump(jsontrace, outfile)
