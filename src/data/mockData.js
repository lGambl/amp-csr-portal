export const WASH_PLANS_PRICING = [
    {
        name: "Basic",
        price: 14.99,
    },
    {
        name: "Deluxe",
        price: 19.99,
    },
    {
        name: "Premium",
        price: 24.99,
    },
    {
        name: "Ultimate",
        price: 29.99,
    },
];

export const STATUS = [
    {
        id: 1,
        name: "Active",
    },
    {
        id: 2,
        name: "Inactive",
    },
    {
        id: 3,
        name: "Overdue",
    },
    {
        id: 4,
        name: "Cancelled",
    },
];

export const ACCOUNT_STATUSES = ["Active", "Inactive", "Cancelled"];

export const STATES = ["CA", "TX", "FL", "NY", "WA", "CO", "IL", "GA", "AZ", "NC"];

export const MAKES = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "BMW",
    "Tesla",
    "Nissan",
    "Hyundai",
    "Jeep",
    "Subaru",
];

export const MODELS = {
    Toyota: ["Camry", "Corolla", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["F-150", "Mustang", "Explorer"],
    Chevrolet: ["Silverado", "Equinox", "Malibu"],
    BMW: ["3 Series", "5 Series", "X5"],
    Tesla: ["Model 3", "Model Y", "Model S"],
    Nissan: ["Altima", "Rogue", "Sentra"],
    Hyundai: ["Elantra", "Tucson", "Sonata"],
    Jeep: ["Wrangler", "Cherokee", "Grand Cherokee"],
    Subaru: ["Outback", "Forester", "Impreza"],
};

export const COLORS = [
    "White",
    "Black",
    "Silver",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Brown",
    "Beige",
    "Orange",
];

const FIRST = [
    "James",
    "Mary",
    "Robert",
    "Patricia",
    "John",
    "Jennifer",
    "Michael",
    "Linda",
    "David",
    "Barbara",
    "William",
    "Susan",
    "Richard",
    "Jessica",
    "Joseph",
    "Sarah",
    "Thomas",
    "Karen",
    "Charles",
    "Lisa",
    "Christopher",
    "Nancy",
    "Daniel",
    "Betty",
    "Matthew",
    "Sandra",
    "Anthony",
    "Margaret",
    "Mark",
    "Ashley",
    "Donald",
    "Kimberly",
    "Steven",
    "Emily",
    "Paul",
    "Donna",
    "Andrew",
    "Michelle",
    "Kenneth",
    "Carol",
    "Joshua",
    "Amanda",
    "Kevin",
    "Melissa",
    "Brian",
    "Deborah",
    "George",
    "Stephanie",
    "Timothy",
    "Rebecca",
];

const LAST = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
    "Turner",
];

function rng(seed) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
}

function pick(arr, r) {
    return arr[Math.floor(r() * arr.length)];
}

function genDate(r, yearsBack = 2) {
    const t = Date.now() - Math.floor(r() * yearsBack * 365 * 24 * 3600 * 1000);
    return new Date(t).toISOString().split("T")[0];
}

export function generateUsers() {
    const WASH_PLANS = WASH_PLANS_PRICING.map((p) => p.name);
    const PLAN_PRICES = Object.fromEntries(
        WASH_PLANS_PRICING.map((p) => [p.name, p.price]),
    );
    const SUB_STATUSES = STATUS.map((s) => s.name);

    const users = [];
    for (let i = 1; i <= 48; i++) {
        const r = rng(i * 7919);
        const numVehicles = Math.floor(r() * 3) + 1;

        const vehicles = Array.from({ length: numVehicles }, (_, vi) => {
            const vm = rng(i * 1000 + vi * 137);
            const vmake = pick(MAKES, vm);
            return {
                id: `V${String(i * 10 + vi).padStart(4, "0")}`,
                year: 2015 + Math.floor(vm() * 10),
                make: vmake,
                model: pick(MODELS[vmake], vm),
                color: pick(COLORS, vm),
                plate: `${pick(STATES, vm)} ${String.fromCharCode(65 + Math.floor(vm() * 26))}${String.fromCharCode(65 + Math.floor(vm() * 26))}${String.fromCharCode(65 + Math.floor(vm() * 26))}-${Math.floor(1000 + vm() * 9000)}`,
            };
        });

        const subscriptions = vehicles.reduce((acc, vehicle, vi) => {
            const vs = rng(i * 3000 + vi * 251);
            if (vs() < 0.85) {
                const plan = pick(WASH_PLANS, vs);
                const status = pick(SUB_STATUSES, vs);
                acc.push({
                    id: `SUB-${String(i * 10 + vi).padStart(4, "0")}`,
                    vehicleId: vehicle.id,
                    plan,
                    planPrice: PLAN_PRICES[plan],
                    status,
                    nextBillingDate:
                        status === "Cancelled"
                            ? null
                            : new Date(
                                  Date.now() +
                                      Math.floor(vs() * 30) * 24 * 3600 * 1000,
                              )
                                  .toISOString()
                                  .split("T")[0],
                    startDate: genDate(vs, 2),
                });
            }
            return acc;
        }, []);

        const numPurchases = Math.floor(r() * 12) + 1;
        const purchases = Array.from({ length: numPurchases }, (_, pi) => {
            const pr = rng(i * 500 + pi * 41);
            const type = pr() > 0.4 ? "Subscription" : "Single Wash";
            const wash = pick(WASH_PLANS, pr);
            return {
                id: `TXN-${String(i * 100 + pi).padStart(6, "0")}`,
                date: genDate(pr, 1),
                type,
                description:
                    type === "Subscription"
                        ? `${wash} Monthly Membership`
                        : `${wash} - Single Wash`,
                amount:
                    type === "Subscription"
                        ? PLAN_PRICES[wash]
                        : (PLAN_PRICES[wash] * 0.7).toFixed(2),
                status: pr() > 0.05 ? "Paid" : "Failed",
            };
        }).sort((a, b) => b.date.localeCompare(a.date));

        const fn = FIRST[i % FIRST.length];
        const ln = LAST[Math.floor(i * 1.7) % LAST.length];
        users.push({
            id: `USR-${String(i).padStart(4, "0")}`,
            firstName: fn,
            lastName: ln,
            email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i > 30 ? i : ""}@example.com`,
            phone: `(${Math.floor(200 + r() * 800)}) ${Math.floor(200 + r() * 800)}-${Math.floor(1000 + r() * 9000)}`,
            joinDate: genDate(r, 3),
            address: `${Math.floor(100 + r() * 9900)} ${pick(["Oak", "Maple", "Cedar", "Pine", "Elm", "River", "Lake", "Hill", "Park", "Main"], r)} ${pick(["St", "Ave", "Blvd", "Dr", "Ln", "Way", "Ct", "Pl"], r)}`,
            city: pick(
                [
                    "Los Angeles",
                    "Houston",
                    "Miami",
                    "New York",
                    "Seattle",
                    "Denver",
                    "Chicago",
                    "Atlanta",
                    "Phoenix",
                    "Charlotte",
                ],
                r,
            ),
            state: pick(STATES, r),
            zip: `${Math.floor(10000 + r() * 90000)}`,
            accountStatus: pick(
                ACCOUNT_STATUSES,
                r,
            ),
            vehicles,
            subscriptions,
            purchases,
        });
    }
    return users;
}
