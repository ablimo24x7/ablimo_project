"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useCallback } from "react";

const countryNames: Record<string, string> = {
  us: "US",
  uk: "UK",
  ae: "UAE",
  sa: "Saudi Arabia",
  qa: "Qatar",
  bh: "Bahrain",
  kw: "Kuwait",
  om: "Oman",
  fr: "France",
  de: "Germany",
  jp: "Japan",
  sg: "Singapore",
  au: "Australia",
  ca: "Canada",
};

const cityNames: Record<string, string> = {
  "new-york": "New York",
  "los-angeles": "Los Angeles",
  "san-francisco": "San Francisco",
  miami: "Miami",
  london: "London",
  manchester: "Manchester",
  birmingham: "Birmingham",
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  riyadh: "Riyadh",
  jeddah: "Jeddah",
  doha: "Doha",
  paris: "Paris",
  lyon: "Lyon",
  berlin: "Berlin",
  munich: "Munich",
  tokyo: "Tokyo",
  singapore: "Singapore",
  sydney: "Sydney",
  melbourne: "Melbourne",
  toronto: "Toronto",
  manama: "Manama",
  kuwait: "Kuwait City",
  muscat: "Muscat",
};

const cityHeroImages: Record<string, string> = {
  "new-york":
    "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=800&fit=crop",
  "los-angeles":
    "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1920&h=800&fit=crop",
  "san-francisco":
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=800&fit=crop",
  miami:
    "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1920&h=800&fit=crop",
  london:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=800&fit=crop",
  manchester:
    "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=1920&h=800&fit=crop",
  birmingham:
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=1920&h=800&fit=crop",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop",
  "abu-dhabi":
    "https://images.unsplash.com/photo-1624317937315-0ced8736c9e9?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  riyadh:
    "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1920&h=800&fit=crop",
  jeddah:
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&h=800&fit=crop",
  doha:
    "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  paris:
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&h=800&fit=crop",
  lyon:
    "https://images.unsplash.com/photo-1524397057412-37f3a3347e55?w=1920&h=800&fit=crop",
  berlin:
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1920&h=800&fit=crop",
  munich:
    "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?w=1920&h=800&fit=crop",
  tokyo:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=800&fit=crop",
  singapore:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&h=800&fit=crop",
  sydney:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&h=800&fit=crop",
  melbourne:
    "https://images.unsplash.com/photo-1514395462725-fb4566210148?w=1920&h=800&fit=crop",
  toronto:
    "https://images.unsplash.com/photo-1517090504332-94f1c2e7dec1?w=1920&h=800&fit=crop",
  manama:
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&h=800&fit=crop",
  kuwait:
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1920&h=800&fit=crop",
  muscat:
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&h=800&fit=crop",
  default:
    "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=800&fit=crop",
};

const citySeoImages: Record<string, string[]> = {
  "new-york": [
    "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
  ],
  "los-angeles": [
    "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop",
  ],
  "san-francisco": [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=600&h=400&fit=crop",
  ],
  miami: [
    "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1545438102-799c399bf1da?w=600&h=400&fit=crop",
  ],
  london: [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1543832923-44667a44c860?w=600&h=400&fit=crop",
  ],
  manchester: [
    "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=400&fit=crop",
  ],
  birmingham: [
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&h=400&fit=crop",
  ],
  dubai: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1691664054143-ccdc900eca74?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1584546459262-0ddde08da490?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  "abu-dhabi": [
    "https://images.unsplash.com/photo-1578152882785-df9744e359e5?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1624317937315-0ced8736c9e9?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1685909201292-d86e15a63a1b?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  riyadh: [
    "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1782216642347-be9deb5939c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506795213373-430e921fe2ed?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  jeddah: [
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
  ],
  doha: [
    "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734455823834-c89ebb125aa3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1647755453118-aad22e0f7cc0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  paris: [
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1431274172761-fca41d94c11d?w=600&h=400&fit=crop",
  ],
  lyon: [
    "https://images.unsplash.com/photo-1524397057412-37f3a3347e55?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524397057412-37f3a3347e55?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524397057412-37f3a3347e55?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524397057412-37f3a3347e55?w=600&h=400&fit=crop",
  ],
  berlin: [
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  ],
  munich: [
    "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?w=600&h=400&fit=crop",
  ],
  tokyo: [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop",
  ],
  singapore: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&h=400&fit=crop",
  ],
  sydney: [
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600&h=400&fit=crop",
  ],
  melbourne: [
    "https://images.unsplash.com/photo-1514395462725-fb4566210148?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1514395462725-fb4566210148?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1514395462725-fb4566210148?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1514395462725-fb4566210148?w=600&h=400&fit=crop",
  ],
  toronto: [
    "https://images.unsplash.com/photo-1517090504332-94f1c2e7dec1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517090504332-94f1c2e7dec1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517090504332-94f1c2e7dec1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517090504332-94f1c2e7dec1?w=600&h=400&fit=crop",
  ],
  manama: [
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop",
  ],
  kuwait: [
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop",
  ],
  muscat: [
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop",
  ],
  default: [
    "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
  ],
};

const benefits = [
  {
    icon: "currency",
    title: "Competitive rates",
    description:
      "Access premium service at distance-based prices that are fair to you and our chauffeurs.",
  },
  {
    icon: "plane",
    title: "Seamless airport travel",
    description:
      "Relax with 1 hour of complimentary wait time and flight tracking.",
  },
  {
    icon: "clock",
    title: "Travel on your terms",
    description:
      "Stay flexible and in charge of your schedule. It's quick and easy for you to cancel or make changes to any ride.",
  },
];

const serviceClasses = [
  {
    title: "Business Class",
    description:
      "Mercedes E-Class, BMW 5 Series, Audi A6, Cadillac XTS, or similar.",
    fitsPeople: 3,
    fitsLuggage:
      "Fits 2 carry-on bags, or 2 standard check-in, or 1 extra large check-in bag",
    availability: "Available in most of our business districts",
    images: [
      "https://images.unsplash.com/photo-1619221496652-7ee3d7406203?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1779025313068-b4a11d86bf0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1779025313068-b4a11d86bf0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop",
    ],
  },
  {
    title: "First Class",
    description: "Mercedes S-Class, BMW 7 Series, Audi A8, or similar",
    fitsPeople: 3,
    fitsLuggage:
      "Fits 2 carry-on bags, or 2 standard check-in, or 1 extra large check-in bag",
    availability: "Available in most of our business districts",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=500&fit=crop",
    ],
  },
  {
    title: "Business Van / SUV",
    description:
      "Mercedes V-Class, Chevy Suburban, Cadillac Escalade, GMC Yukon Denali, or similar",
    fitsPeople: 5,
    fitsLuggage:
      "Fits 12 carry-on bags or 8 standard check-in or 6 extra large check-in bags",
    availability: "Best for larger parties, lots of luggage, or families",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop",
    ],
  },
];

const faqItems = [
  {
    question: "How does booking and pricing work?",
    answer: [
      "1. Enter your pickup and drop-off locations to see a fixed price.",
      "2. Choose your preferred service class and vehicle.",
      "3. Select your pickup date and time.",
      "4. Confirm your booking and receive instant confirmation.",
      "5. Your chauffeur details will be sent to you before your ride.",
    ],
  },
  {
    question: "What happens if my flight is delayed?",
    answer: [
      "We monitor all flights in real-time. If your flight is delayed, your chauffeur will automatically adjust the pickup time. You won't be charged extra for flight delays, and your chauffeur will be waiting when you land.",
    ],
  },
  {
    question: "Is meet and greet service included?",
    answer: [
      "Yes, meet and greet service is included with all airport transfers. Your chauffeur will meet you in the arrivals hall with a personalized name board and assist you with your luggage.",
    ],
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: [
      "Yes, you can cancel or modify your booking up to 24 hours before your scheduled pickup time at no extra charge. For changes within 24 hours, please contact our support team.",
    ],
  },
];

function slugToName(slug: string, map: Record<string, string>): string {
  if (map[slug]) return map[slug];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="text-white/80 flex-shrink-0 mt-0.5"
    >
      <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-400">
      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-400">
      <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#181a1f">
      <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-500">
      <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 13H11V17H6V13Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-500">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z" />
    </svg>
  );
}

export default function DynamicAirportTransferPage() {
  const params = useParams();
  const countrySlug = params.country as string;
  const citySlug = params.city as string;

  const countryName = slugToName(countrySlug, countryNames);
  const cityName = slugToName(citySlug, cityNames);

  const heroImage = cityHeroImages[citySlug] || cityHeroImages.default;
  const seoImages = citySeoImages[citySlug] || citySeoImages.default;

  const [activeTab, setActiveTab] = useState<"one-way" | "hourly">("one-way");
  const [benefitIndex, setBenefitIndex] = useState(0);
  const [serviceImageIndices, setServiceImageIndices] = useState<number[]>(
    serviceClasses.map(() => 0)
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const nextServiceImage = useCallback((serviceIdx: number) => {
    setServiceImageIndices((prev) => {
      const next = [...prev];
      const total = serviceClasses[serviceIdx].images.length;
      next[serviceIdx] = (next[serviceIdx] + 1) % total;
      return next;
    });
  }, []);

  const prevServiceImage = useCallback((serviceIdx: number) => {
    setServiceImageIndices((prev) => {
      const next = [...prev];
      const total = serviceClasses[serviceIdx].images.length;
      next[serviceIdx] = (next[serviceIdx] - 1 + total) % total;
      return next;
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px]">
        <Image
          src={heroImage}
          alt={`Airport Transfer in ${cityName}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />

        {/* Hero Content + Booking Widget */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full max-w-7xl mx-auto px-8 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 max-w-2xl">
              Airport Transfer in {cityName}
            </h1>

            {/* Booking Widget */}
            <div className="bg-white rounded-2xl p-6 max-w-4xl">
              {/* Tabs */}
              <div className="flex gap-1 mb-5">
                <button
                  onClick={() => setActiveTab("one-way")}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    activeTab === "one-way"
                      ? "bg-[#292a30] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  One way
                </button>
                <button
                  onClick={() => setActiveTab("hourly")}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    activeTab === "hourly"
                      ? "bg-[#292a30] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  By the hour
                </button>
              </div>

              {/* Form */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* From */}
                <div className="flex-1 relative">
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    From
                  </label>
                  <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <LocationIcon />
                    <input
                      type="text"
                      placeholder="Address, airport, hotel, ..."
                      className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="flex-1 relative">
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    To
                  </label>
                  <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <LocationIcon />
                    <input
                      type="text"
                      placeholder="Address, airport, hotel, ..."
                      className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="w-full md:w-44">
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    Date
                  </label>
                  <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <CalendarIcon />
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="w-full md:w-44">
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    Pickup time
                  </label>
                  <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <ClockIcon />
                    <input
                      type="text"
                      placeholder="Select time"
                      className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Chauffeur will wait 15 minutes free of charge.
                  </p>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button className="bg-[#292a30] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#1c1d21] transition-colors whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="max-w-7xl mx-auto px-8 py-6">
        <nav aria-label="Breadcrumb navigation">
          <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span aria-hidden="true">→</span>
            </li>
            <li className="flex items-center gap-2">
              <Link
                href="/countries"
                className="hover:text-white transition-colors"
              >
                Countries
              </Link>
              <span aria-hidden="true">→</span>
            </li>
            <li className="flex items-center gap-2">
              <Link
                href={`/countries/${countrySlug}`}
                className="hover:text-white transition-colors"
              >
                {countryName}
              </Link>
              <span aria-hidden="true">→</span>
            </li>
            <li className="flex items-center gap-2">
              <Link
                href={`/countries/${countrySlug}/${citySlug}`}
                className="hover:text-white transition-colors"
              >
                {cityName}
              </Link>
              <span aria-hidden="true">→</span>
            </li>
            <li>
              <span className="text-white" aria-current="page">
                Airport Transfer in {cityName}
              </span>
            </li>
          </ol>
        </nav>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-4xl mx-auto px-8 py-12 md:py-16">
        <blockquote className="text-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-6 text-white/90">
            &ldquo;Probably the best airport pickup service I have experienced!
            Superb quality of car and hospitality.&rdquo;
          </p>
          <cite className="text-sm text-gray-400 not-italic">
            Priyakant A.
          </cite>
        </blockquote>
      </section>

      {/* USP Benefits */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {benefit.icon === "currency" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z" />
                    </svg>
                  )}
                  {benefit.icon === "plane" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  )}
                  {benefit.icon === "clock" && (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed pl-[52px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {benefits.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBenefitIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                benefitIndex === idx ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`USP ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Service Classes - Cards with Image Carousel */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Discover our service classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceClasses.map((service, serviceIdx) => (
            <div
              key={service.title}
              className="bg-[#1c1d21] rounded-2xl overflow-hidden"
            >
              {/* Image Carousel - WORKING */}
              <div className="relative aspect-[16/10] overflow-hidden group">
                <Image
                  src={service.images[serviceImageIndices[serviceIdx]]}
                  alt={service.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
                {/* Prev Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevServiceImage(serviceIdx);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextServiceImage(serviceIdx);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
                {/* Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {service.images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setServiceImageIndices((prev) => {
                          const next = [...prev];
                          next[serviceIdx] = imgIdx;
                          return next;
                        });
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        imgIdx === serviceImageIndices[serviceIdx]
                          ? "bg-white"
                          : "bg-white/40"
                      }`}
                      aria-label={`Image ${imgIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {service.description}
                </p>
                <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-4" />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-white/80">
                      Fits up to {service.fitsPeople} people
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-white/80">
                      {service.fitsLuggage}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-white/80">
                      {service.availability}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Sections */}
      <section className="max-w-7xl mx-auto px-8">
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Your reliable {cityName} airport transfer
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              <p>
                {cityName} requires little introduction. As one of the
                world&apos;s most iconic cities, its fame spans many genres;
                food, business, finance, culture, architecture and history. Whether
                you are traveling to {cityName} for business or pleasure, it&apos;s
                important you organize your ground transportation in advance,
                including your important airport transfer to and from the airport.
              </p>
              <p>
                Whether you are staying in the city center or the surrounding
                areas, Blacklane is available for airport transfers city-wide, a
                far more reliable and relaxing alternative to a standard taxi or
                shared airport shuttle service.
              </p>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
            <Image src={seoImages[0]} alt={`${cityName} airport transfer`} fill className="object-cover" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Arrival at {cityName} airports
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              <p>
                {cityName} is one of the busiest metropolitan areas in the world
                and landing at its airports can be a trying endeavor. Blacklane
                chauffeurs are always polite, smartly dressed and discrete.
              </p>
              <p>
                Our stylish airport transfer is perfect for those flying into{" "}
                {cityName} on business who will appreciate our spacious,
                comfortable and stylish cars.
              </p>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
            <Image src={seoImages[1]} alt={`${cityName} airport arrival`} fill className="object-cover" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Explore {cityName} with a Blacklane limo
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              <p>
                In a city as rich and vibrant as {cityName}, even business
                travelers must take a little time off to experience what the
                city has to offer. As well as our airport shuttle service,
                Blacklane cars are available for city trips and by-the-hour hire.
              </p>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
            <Image src={seoImages[2]} alt={`${cityName} limousine service`} fill className="object-cover" />
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Flying into {cityName}
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              <p>
                Choosing the best airport for you often depends on where
                you&apos;re staying and how you plan to continue into the city.
                If you&apos;re arriving during peak travel times, it&apos;s worth
                planning your onward journey in advance.
              </p>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
            <Image src={seoImages[3]} alt={`Flying into ${cityName}`} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-0">
          {faqItems.map((item, idx) => (
            <div
              key={item.question}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 flex items-center justify-between text-left"
              >
                <h3 className="text-base md:text-lg font-semibold pr-4">
                  {item.question}
                </h3>
                {openFaq === idx ? <ArrowUp /> : <ArrowDown />}
              </button>
              {openFaq === idx && (
                <div className="pb-5 text-sm text-gray-400 leading-relaxed">
                  <ul className="space-y-2">
                    {item.answer.map((line, lineIdx) => (
                      <li key={lineIdx}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
