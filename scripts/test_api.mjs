const url = 'http://localhost:3000/api/calculate';
const body = JSON.stringify({
    from: 'TOKYO',
    to: 'SHIN_OSAKA',
    seatType: 'reserved'
});

async function main() {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });
        if (!res.ok) {
            console.error('API Error:', res.status, await res.text());
            return;
        }
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Fetch failed:', e);
    }
}

main();
