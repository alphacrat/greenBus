export const Buses = [
  {
    id: 1,
    busNo: "AS-23XA-6969",
    name: "Aniruddha Travels",
    coordinatorName: "John Doe",
    source: "Tinsukia",
    destination: "Guwahati",
    departureTime: "06:00 PM",
    arrivalTime: "4:30 AM",
    price: "600",
    availableDates: ["2024-05-07", "2024-05-08", "2024-05-09", "2024-05-11", "2024-05-13"],
    busType: "Sleeper",
    numberOfSeats: 36,
    seatLayout: {
      lower: {
        first: [
          [1, 2, 3, 4, 5, 6],
          [7, 8, 9, 10, 11, 12],
        ],
        second: [13, 14, 15, 16, 17, 18],
      },
      upper: {
        first: [
          [19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30],
        ],
        second: [31, 32, 33, 34, 35, 36],
      },
    },
    availableSeats: ["L17", "U24", "U30", "L4", "L16", "L6"],

    totalAmountPerDay: {
      "2024-05-07": 3600, 
      "2024-05-08": 5400,
      "2024-05-09": 4800,
      "2024-05-11": 6000,
      "2024-05-13": 7200,
    },
    staff: [
      {
        id: 1,
        name: "Alice",
        role: "Driver",
      },
      {
        id: 2,
        name: "Bob",
        role: "Conductor",
      },
    ],
  },
  {
    id: 2,
    busNo : "AS-23XA-3221",
    name: "Puja Travels",
    source: "Tinsukia",
    destination: "Tezpur",
    departureTime: "07:30 AM",
    arrivalTime: "04:00 PM",
    price: "550",
    availableDates: ["2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18"],
    busType: "Seater",
    numberOfSeats: 60,
    seatLayout: {
      first: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      ],
      second: [
        [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      ],
    },
    availableSeats: [
      "1",
      "2",
      "3",
      "5",
      "7",
      "13",
      "15",
      "60",
      "59",
    ],
  },
  {
    id: 3,
    busNo: 'AS-12-XS-2091',
    name: "JS Travels",
    source: "Tinsukia",
    destination: "Tezpur",
    departureTime: "09:15 AM",
    arrivalTime: "03:45 PM",
    price: "₹700",
    availableDates: ["2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2024-05-07"],
    busType: "Sleeper",
    numberOfSeats: 36,
    seatLayout: {
      lower: {
        first: [
          [1, 2, 3, 4, 5, 6],
          [7, 8, 9, 10, 11, 12, 13],
        ],
        second: [13, 14, 15, 16, 17, 18],
      },
      upper: {
        first: [
          [19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30],
        ],
        second: [31, 32, 33, 34, 35, 36],
      },
    },
    availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
  },
   {
    id: 4,
    busNo: "AS-23XA-6269",
    name: "Aniruddha Travels",
    coordinatorName: "Bismoy Das",
    source: "Tinsukia",
    destination: "Guwahati",
    departureTime: "06:00 PM",
    arrivalTime: "4:30 AM",
    price: "600",
    availableDates: ["2024-05-07", "2024-05-08", "2024-05-09", "2024-05-11", "2024-05-13"],
    busType: "Sleeper",
    numberOfSeats: 36,
    seatLayout: {
      lower: {
        first: [
          [1, 2, 3, 4, 5, 6],
          [7, 8, 9, 10, 11, 12],
        ],
        second: [13, 14, 15, 16, 17, 18],
      },
      upper: {
        first: [
          [19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30],
        ],
        second: [31, 32, 33, 34, 35, 36],
      },
    },
    availableSeats: ["L17", "U24", "U30", "L4", "L16", "L6"],

    totalAmountPerDay: {
      "2024-05-07": 3600, 
      "2024-05-08": 5400,
      "2024-05-09": 4800,
      "2024-05-11": 6000,
      "2024-05-13": 7200,
    },
    staff: [
      {
        id: 1,
        name: "Anhhs",
        role: "Driver",
      },
      {
        id: 2,
        name: "Bisuu",
        role: "Conductor",
      },
    ],
  },
];

export const locations = [
  "Tinsukia",
  "Tezpur",
  "Guwahati",
];