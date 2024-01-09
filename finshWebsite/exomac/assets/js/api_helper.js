const baseUrl = "https://silver.tripu.net/api/v1/driver";

const AppData = {
  baseUrl: baseUrl,
  login_phone: `${baseUrl}/login_phone`,
  register: `${baseUrl}/register`,
  login: `${baseUrl}/login`,
  restPassword: `${baseUrl}/restPassword`,
  logout: `${baseUrl}/logout`,
  changePassword: `${baseUrl}/change-password`,
  driversProfile:
    "https://silver.tripu.net/api/v1/driver/drivers-profile?api_secret_key=9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM",
  access_token: "9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM",
  token: "",
};
const IsSignIn = document.getElementById("IsSignIn");
const profileName = document.getElementById("profileName");
profileName.style.display = "none";
/*#################LoginCaption ###########################*/
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("Login");
  const emailCaption = document.getElementById("emailCaption");
  const passwordCaption = document.getElementById("passwordCaption");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    loginCaptions();
  });

  async function loginCaptions() {
    const email = emailCaption.value;
    const password = passwordCaption.value;

    const data = {
      email: email,
      password: password,
      api_secret_key: AppData.access_token,
    };

    try {
      const response = await fetch(AppData.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        window.localStorage.setItem("token", responseData.access_token);
        console.log(responseData.access_token);
        console.log(responseData.user.name);
        console.log(responseData.user.email);
        IsSignIn.style.display = "none";
        profileName.textContent = responseData.user.name;
        profileName.style.display = "block";

      } else {
        IsSignIn.style.display = "block";
        profileName.textContent = "Profile";
        profileName.style.display = "none";

        console.log("Network response was not OK: " + response.status);
        // throw new Error("Network response was not OK");
      }
    } catch (error) {
      console.log("Network response was not OK: " + error);
      // throw new Error("error in response: " + `${error.message}`);
    }
  }
});

/*#################Register Caption ###########################*/
// // register Area
document.addEventListener("DOMContentLoaded", () => {
  const name_caption = document.getElementById("name_caption");
  const email_caption = document.getElementById("email_caption");
  const phone_caption = document.getElementById("phone_caption");
  //const gender_caption = document.getElementById("gender_caption");
  const country_caption = document.getElementById("country_caption");
  const password_caption = document.getElementById("password_caption");
  const register = document.getElementById("register");
  let gender = "";
  register.addEventListener("click", (event) => {
    event.preventDefault();

    Register();
  });

  async function Register() {
    const data_register = {
      name: name_caption.value,
      phone: phone_caption.value,
      email: email_caption.value,
      password: password_caption.value,
      gender: gender,
      country_id: (country_caption.value = "65"),
      api_secret_key: AppData.access_token,
    };

    try {
      const response = await fetch(AppData.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_register),
      });
      if (response.ok) {
        const responseData = await response.json();
        AppData.token = responseData.access_token;

        console.log(responseData.access_token);
        console.log(responseData.user.name);
        console.log(responseData.user.email);
        IsSignIn.style.display = "none";
        profileName.textContent = responseData.user.name;
        profileName.style.display = "block";

        console.log("Successfully registered");
      } else {
        IsSignIn.style.display = "block";
        profileName.textContent = "Profile";
        profileName.style.display = "none";

        console.log("Network response was not OK: " + response.status);
        //throw new Error("Network response was not OK");
      }
    } catch (error) {
      console.log("Network response was not OK: " + error);
      //throw new Error("Error in response: " + error.message);
    }
  }

  function getGenderSelected() {
    gender = document.getElementById("gender").value;
    console.log(gender);
  }
});

/*#################Reset Password Caption ###########################*/

document.addEventListener("DOMContentLoaded", () => {});
document.addEventListener("DOMContentLoaded", () => {
  const upDatePass = document.getElementById("upDatePass");
  const setPass = document.getElementById("setPass");

  setPass.addEventListener("click", (event) => {
    event.preventDefault();
    ResetPassword();
  });

  async function ResetPassword() {
    accountToken = window.localStorage.getItem("token");

    const data_reset = {
      password: upDatePass.value,
      api_secret_key: AppData.access_token,
    };

    try {
      const response = await fetch(AppData.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accountToken}`,
        },
        body: JSON.stringify(data_reset),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Successfully Updated Password");
      } else {
        console.log("Network response was not OK: " + response.status);
        //throw new Error("Network response was not OK");
      }
    } catch (error) {
      console.log("Network response was not OK: " + error);
      //throw new Error("Error in response: " + error.message);
    }
  }
});
/*#################LogOut Caption ###########################*/

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });

  async function logout() {
    accountToken = window.localStorage.getItem("token");

    const data_logout = {
      api_secret_key: AppData.access_token,
    };

    try {
      const response = await fetch(AppData.logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accountToken}`,
        },
        body: JSON.stringify(data_logout),
      });

      if (response.ok) {
        const responseData = await response.json();
        IsSignIn.style.display = "block";
        profileName.textContent = "Profile";
        profileName.style.display = "none";

        console.log("Successfully logged out");
      } else {
        console.log("Network response was not OK: " + response.status);
        //throw new Error("Network response was not OK");
      }
    } catch (error) {
      console.log("Network response was not OK: " + error);
      //throw new Error("Error in response: " + error.message);
    }
  }
});

/*Profile model  class*/
let ProfileCaptionModel = {
  data: {
    id: 10,
    name: "Ezz",
    email: "",
    phone: "",
    gender: "male",
    inviteFriend: "null",
    captaincar: {
      id: 10,
      car_make_id: null,
      car_model_id: null,
      car_type_id: null,
      category_car_id: {
        id: 4,
        name: "C",
        status: "Active",
        create_dates: {
          created_at_human: "1 month ago",
          created_at: "23-11-14 11:54:26",
        },
        update_dates: {
          updated_at_human: "1 month ago",
          updated_at: "23-11-14 11:54:26",
        },
      },
      number_car: "م ن 3888",
      color_car: null,
      create_dates: {
        created_at_human: "2 months ago",
        created_at: "23-11-01 10:42:27",
      },
      update_dates: {
        updated_at_human: "2 months ago",
        updated_at: "23-11-01 10:42:27",
      },
    },
    profile: {
      id: 10,
      amountDay: "0.00",
      wallet: 0,
      point: "0",
      bio: null,
      rate: 0,
      number_trips: 0,
      number_personal: null,
      create_dates: {
        created_at_human: "2 months ago",
        created_at: "23-11-01 10:42:27",
      },
      update_dates: {
        updated_at_human: "2 months ago",
        updated_at: "23-11-01 10:42:27",
      },
    },
    country: {
      id: 65,
      name: "Egypt",
      status: 1,
      code: "20",
      logo: "https://silver.tripu.net/assets/images/Eg.png",
      create_dates: {
        created_at_human: "1 month ago",
        created_at: "23-11-14 11:54:21",
      },
      update_dates: {
        updated_at_human: "1 month ago",
        updated_at: "23-11-14 11:54:21",
      },
    },
    fcm_token: null,
    status: "active",
    avatar: null,
    create_dates: {
      created_at_human: "2 months ago",
      created_at: "23-11-01 10:42:27",
    },
    update_dates: {
      updated_at_human: "19 hours ago",
      updated_at: "24-01-08 04:36:58",
    },
  },
};
/*Profile Api  fetch*/
document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profile");

  profileBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getProfileCaption();
  });

  async function getProfileCaption() {
    accountToken = window.localStorage.getItem("token");
    try {
      const response = await fetch(AppData.driversProfile, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accountToken}`,
        },
        // body: JSON.stringify({}),
      });

      if (response.ok) {
        const responseData = await response.json();
        ProfileCaptionModel.data = responseData.data;
        ProfileCaptionModel.data.email = responseData.data.email;
        ProfileCaptionModel.data.name = responseData.data.name;
        ProfileCaptionModel.data.phone = responseData.data.phone;
        ProfileCaptionModel.data.profile.rate = responseData.data.profile.rate;
        console.log(ProfileCaptionModel.data.email);
        console.log(ProfileCaptionModel.data.name);
        console.log(ProfileCaptionModel.data.phone);
        console.log(ProfileCaptionModel.data.profile.rate);
        console.log("Successfully get Profile Caption");
      } else {
        console.log("Network response was not OK: " + response.status);
        //throw new Error("Network response was not OK");
      }
    } catch (error) {
      console.log("Network response was not OK: " + error);
      //throw new Error("Error in response: " + error.message);
    }
  }
});