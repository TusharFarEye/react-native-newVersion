const getUserDetails = async () => {
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
          let response = await fetch(
          `http://10.0.2.2:8080/user-details` ,
          // {headers: { 'X-XSRF-TOKEN': csrfToken },},
          {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              // body: JSON.stringify({
              //   username: userData.username,
              //   password: userData.password,
              // })
            });
            return await response;
      } catch (error) {
        console.error(error);
      }
    };
  
  export {getUserDetails};