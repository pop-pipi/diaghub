def get_demo_data():
    response = """
    {
        "drivers" : [
            {
                "lat" : -37.8122489,
                "lng" : 144.9621762,
                "name" : "Matthew Richardson",
                "id" : 1
            },
            {
                "lat" : -37.750887,
                "lng" : 144.925486,
                "name" : "Jane Doe",
                "id" : 2
            },
            {
                "lat" : -37.7321639,
                "lng" : 144.9458019,
                "name" : "Jack Stevenson",
                "id" : 3
            },
            {
                "lat" : -37.7651438,
                "lng" : 144.9461835,
                "name" : "Dhanu Padmathala",
                "id" : 4
            },
            {
                "lat" : -37.7765079,
                "lng" : 144.828836,
                "name" : "Nikki Bright",
                "id" : 5
            }
        ],
        "jobs" : [
            {
                "id" : 1,
                "driver_id" : 1,
                "status" : "On Route",
                "ETA" : "1557452245",
                "end_date" : "1558105200",
                "origin_lat" : -37.836636,
                "origin_lng" : 144.884661,
                "end_lat" : -37.740947,
                "end_lng" : 144.822231
            },
            {
                "id" : 2,
                "driver_id" : 2,
                "status" : "On Route",
                "ETA" : "1557412245",
                "end_date" : "1558105200",
                "origin_lat" : -37.836636,
                "origin_lng" : 144.884661,
                "end_lat" : -37.726047,
                "end_lng" : 145.891171
            },
            {
                "id" : 3,
                "driver_id" : 3,
                "status" : "On Route",
                "ETA" : "1557452845",
                "end_date" : "1558105200",
                "origin_lat" : -37.836636,
                "origin_lng" : 144.884661,
                "end_lat" : -37.709429,
                "end_lng" : 144.966514
            },
            {
                "id" : 4,
                "driver_id" : 4,
                "status" : "On Route",
                "ETA" : "1557422245",
                "end_date" : "1558105200",
                "origin_lat" : -37.836636,
                "origin_lng" : 144.884661,
                "end_lat" : -37.799743,
                "end_lng" : 145.056560
            },
            {
                "id" : 5,
                "driver_id" : 5,
                "status" : "Pick-up",
                "ETA" : "1557482245",
                "end_date" : "1558105200",
                "origin_lat" : -37.836636,
                "origin_lng" : 144.884661,
                "end_lat" : -37.853362,
                "end_lng" : 145.021330
            }
        ],
        "vehicles" : [
            {
                "id" : 1,
                "driver_id" : 1,
                "registration_no" : "AK9CK2",
                "vehicle_class" : "Heavy Rigid",
                "capacity" : 8000
            },
            {
                "id" : 2,
                "driver_id" : 2,
                "registration_no" : "TJN701",
                "vehicle_class" : "Light Rigid",
                "capacity" : 5000
            },
            {
                "id" : 3,
                "driver_id" : 3,
                "registration_no" : "MN1C21",
                "vehicle_class" : "Medium Rigid",
                "capacity" : 6000
            },
            {
                "id" : 4,
                "driver_id" : 4,
                "registration_no" : "L4CA72",
                "vehicle_class" : "Medium Rigid",
                "capacity" : 6500
            },
            {
                "id" : 5,
                "driver_id" : 5,
                "registration_no" : "1LD1KB",
                "vehicle_class" : "Car",
                "capacity" : 3000
            }
        ],
        "cargo" : [
            {
                "id" : 1,
                "description" : "Dapagliflozin - Drug",
                "fragility" : 4,
                "weight" : 100
            },
            {
                "id" : 2,
                "description" : "Seagate Drives - Tech",
                "fragility" : 1,
                "weight" : 4000
            },
            {
                "id" : 3,
                "description" : "Aluminium tubing",
                "fragility" : 3,
                "weight" : 4000
            },
            {
                "id" : 4,
                "description" : "Tomatoes - Food",
                "fragility" : 2,
                "weight" : 2000
            },
            {
                "id" : 5,
                "description" : "Stawberries - Food",
                "fragility" : 2,
                "weight" : 2000
            }            
        ]
    }
    """

    return response