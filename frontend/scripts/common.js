function checkUserData() {
    const url = new URL(location.href);
    const name = url.searchParams.get('name');
    // const email = url.searchParams.get('email');
    // const password = url.searchParams.get('password');

    // if (!name || !email || !password)
    if (!name) {
        location.href = '#/sign-up';
    }
}