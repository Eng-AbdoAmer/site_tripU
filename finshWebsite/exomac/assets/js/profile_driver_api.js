//import { carMakerModel } from "./car_maker_model";

/*Profile model  class*/
const uploadAllMediaLink =
  "https://silver.tripu.net/api/v1/driver/profile/media/uploadProfile";
const driversProfileLink =
  "https://silver.tripu.net/api/v1/driver/drivers-profile?api_secret_key=9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM";

const getAllMediaLink =
  "https://silver.tripu.net/api/v1/driver/profile/media/allMedia";
const getAllCarMakersLink =
  "https://silver.tripu.net/api/v1/carMake?api_secret_key=9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM";
const api_secret_key = "9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM";
const newProfilePhoto =
  "https://silver.tripu.net/api/v1/driver/profile/media/uploadProfile";

const getCarTypesLink =
  "https://silver.tripu.net/api/v1/carType?api_secret_key=9BKZASpQqbi5LieDS2NqAgi6CKL9IWIM";
let ProfileCaptionModel = {
  data: {
    id: 10,
    name: "Ezz",
    email: "abc@example",
    phone: "01013597782",
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
/* Profile Api  fetch */
document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profile");
  const caption_name = document.getElementById("caption_name");
  const caption_country = document.getElementById("caption_country");
  const caption_rating = document.getElementById("caption_rating");
  const captain_email = document.getElementById("captain_email");
  const captain_phone = document.getElementById("captain_phone");
  const captain_gender = document.getElementById("captain_gender");
  const captain_img = document.getElementById("captain_img");

  profileBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getProfileCaption();
    getAllMedia();
    getAllMediaToCar();
  });

  async function getProfileCaption() {
    accountToken = window.localStorage.getItem("token");
    try {
      const response = await fetch(driversProfileLink, {
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
        updateRating(3);
        caption_name.textContent = ProfileCaptionModel.data.name;
        caption_country.textContent = ProfileCaptionModel.data.country.name;
        caption_rating.textContent = ProfileCaptionModel.data.profile.rate;
        captain_email.textContent = ProfileCaptionModel.data.email;
        captain_phone.textContent = ProfileCaptionModel.data.phone;
        captain_gender.textContent = ProfileCaptionModel.data.gender;
        captain_img.src = ProfileCaptionModel.data.avatar;
        // ProfileCaptionModel.data.email = responseData.data.email;
        // ProfileCaptionModel.data.name = responseData.data.name;
        // ProfileCaptionModel.data.phone = responseData.data.phone;
        // ProfileCaptionModel.data.profile.rate = responseData.data.profile.rate;
        // console.log(ProfileCaptionModel.data.email);
        // console.log(ProfileCaptionModel.data.name);
        // console.log(ProfileCaptionModel.data.phone);
        // console.log(ProfileCaptionModel.data.profile.rate);
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
/*#################################Get All Media ############################################# */
let allMedia = {
  message: "All media retrieved successfully",
  data: [
    {
      photo_status: "accept",
      photo_type: "id_photo_back",
      reject_reason: null,
      image_path:
        "https://silver.tripu.net/dashboard/img/Abdo__Amer_dcd1ddf3-e93e-4d87-9bf2-8382fbfc2aa7/personal/id_photo_back.jpeg",
    },
  ],
};
const allPhotos_status = document.querySelectorAll("#photo_status");
const reject_reason = document.querySelectorAll("#reject_reason");
const media_images = document.querySelectorAll("#media_images");
const media_title = document.querySelectorAll("#title_media");
const media_img_car = document.querySelectorAll("#media_img_car");
const photo_status = document.getElementById("photo_status");

const photo_type = document.getElementById("photo_type");
const image_path = document.getElementById("image_path");
//////////////////////////

async function getAllMedia() {
  accountToken = window.localStorage.getItem("token");

  const data = {
    type: "personal",
    api_secret_key: api_secret_key,
  };

  try {
    const response = await fetch(getAllMediaLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      allMedia = responseData;
      allMedia.data.forEach((media, index) => {
        media_title[index].textContent = media.photo_type;
        media_images[index].src =
          media.image_path ??
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fload-icon-png&psig=AOvVaw2Eeqnc_7UBmqRIhAdqjToA&ust=1705322875229000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPjaxvP03IMDFQAAAAAdAAAAABAE";
        if (media.photo_status == "not_active") {
          allPhotos_status[index].style.color = "gray";
          return (allPhotos_status[index].textContent = "Not active");
        }
        if (media.photo_status == "rejected") {
          allPhotos_status[index].style.color = "red";
          reject_reason[index].textContent = media.reject_reason;
          reject_reason[index].style.color = "red";
          return (allPhotos_status[index].textContent = "rejected");
        }
        if (media.photo_status == "accept") {
          allPhotos_status[index].style.color = "green";
          return (allPhotos_status[index].textContent = "Accepted");
        }
      });
      /*2 */
      console.log(allMedia.message);
      console.log("Successfully get All Media");
    } else {
      console.log("Network response was not OK: " + response.status);
    }
  } catch (error) {
    console.log("Network response was not OK: " + error);
  }
}
/*####################################*/
const media_type = document.querySelectorAll("#media_type");
const photo_status_car = document.querySelectorAll("#photo_status_car");
const reject_reason_car = document.querySelectorAll("#reject_reason_car");

async function getAllMediaToCar() {
  accountToken = window.localStorage.getItem("token");

  const data = {
    type: "car",
    api_secret_key: api_secret_key,
  };

  try {
    const response = await fetch(getAllMediaLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      allMedia = responseData;
      allMedia.data.forEach((media, index) => {
        media_type[index].textContent = media.photo_type;
        media_img_car[index].src =
          media.image_path ??
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fload-icon-png&psig=AOvVaw2Eeqnc_7UBmqRIhAdqjToA&ust=1705322875229000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPjaxvP03IMDFQAAAAAdAAAAABAE";
        if (media.photo_status == "not_active") {
          photo_status_car[index].style.color = "gray";
          return (photo_status_car[index].textContent = "Not active");
        }
        if (media.photo_status == "rejected") {
          photo_status_car[index].style.color = "red";
          reject_reason_car[index].textContent = media.reject_reason;
          reject_reason_car[index].style.color = "red";
          return (photo_status_car[index].textContent = "rejected");
        }
        if (media.photo_status == "accept") {
          photo_status_car[index].style.color = "green";
          return (photo_status_car[index].textContent = "Accepted");
        }
      });
      /*2 */
      console.log(allMedia.message);
      console.log("Successfully get All Media To Car");
    } else {
      console.log("Network response was not OK: " + response.status);
    }
  } catch (error) {
    console.log("Network response was not OK: " + error);
  }
}
/*########################################### */
const captionRating = document.getElementById("caption_rating");
const stars = document.querySelectorAll(".rating .fa-star");

// Function to update the star rating
function updateRating(rating) {
  // Reset all stars to default color
  stars.forEach((star) => star.classList.remove("checked"));

  // Update the caption rating text
  captionRating.textContent = rating;

  // Color the stars up to the rating value
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add("checked");
  }
}

/*######################Upload Caption All Media ###########################*/
const id_card_fornt = document.getElementById("id_card_fornt");
const id_card_back = document.getElementById("id_card_back");
const personalAvatar = document.getElementById("personalAvatar");
const criminal = document.getElementById("criminal");
const carLicenseFront = document.getElementById("carLicenseFront");
const carLicenseBack = document.getElementById("carLicenseBack");
const LicenseCardFront = document.getElementById("LicenseCardFront");
const LicenseCardBack = document.getElementById("LicenseCardBack");
const plateNumber = document.getElementById("plateNumber");
const carColor = document.getElementById("carColor");
const frontCar = document.getElementById("frontCar");
const backCar = document.getElementById("backCar");
const rightCar = document.getElementById("rightCar");
const leftCar = document.getElementById("leftCar");
const insideCar = document.getElementById("insideCar");
const carBrand = document.getElementById("carbrand");
const carModel = document.getElementById("carModel");
const saveMedia = document.getElementById("saveMedia");
const typeOfCar = document.getElementById("typeOfCar");
const idNumber = document.getElementById("idNumber");
const valid_IdNumber = document.getElementById("valid_IdNumber");
const yearSelect = document.getElementById("theYearOfTheCar");
/*############# Car maker Model #######################*/
let carMakerModel = {
  status: true,
  message: "data Return Successfully",
  data: [
    {
      id: 1,
      name: "Acura",
      status: "Active",
      cars_model: [
        {
          id: 1,
          name: "CL",
          status: "Active",
          create_dates: {
            created_at_human: "2 months ago",
            created_at: "23-11-14 11:54:26",
          },
          update_dates: {
            updated_at_human: "2 months ago",
            updated_at: "23-11-14 11:54:26",
          },
        },
      ],
      create_dates: {
        created_at_human: "2 months ago",
        created_at: "23-11-14 11:54:26",
      },
      update_dates: {
        updated_at_human: "2 months ago",
        updated_at: "23-11-14 11:54:26",
      },
    },
  ],
};
const carBtn = document.getElementById("carBtn");

carBtn.addEventListener("click", (event) => {
  event.preventDefault();

  getCarMaker();
  getCarType();
});
async function getCarMaker() {
  //accountToken = window.localStorage.getItem("token");
  try {
    const response = await fetch(getAllCarMakersLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accountToken}`,
      },
      // body: JSON.stringify({}),
    });

    if (response.ok) {
      const responseData = await response.json();
      carMakerModel.data = responseData.data;
      carMakerModel.data.forEach((model, index) => {
        //console.log(`carName##` + carMakerModel.data[index].name);
        //carBrand.innerHTML = `<option value=${carMakerModel.data[index].name}>${carMakerModel.data[index].name}</option>`;
        let myOption = document.createElement("option");
        myOption.setAttribute("value", carMakerModel.data[index].id);
        myOption.textContent = carMakerModel.data[index].name;
        // console.log(
        //   ` carMakerModel.data[index].id==> ${carMakerModel.data[index].id}`
        // );
        carBrand.appendChild(myOption);
        myOption.setAttribute("number", index);

        for (let i = 0; i < carMakerModel.data[index].cars_model.length; i++) {
          let myOption = document.createElement("option");
          myOption.setAttribute(
            "value",
            carMakerModel.data[index].cars_model[i].name
          );

          myOption.textContent = carMakerModel.data[index].cars_model[i].name;
          carModel.appendChild(myOption);
          //console.log(`model==` + carMakerModel.data[53].cars_model[i].name);
        }
      });

      // });
      console.log("Successfully get Car Maker");
    } else {
      console.log("Network response was not OK: " + response.status);
      //throw new Error("Network response was not OK");
    }
  } catch (error) {
    console.log("Network response was not OK: " + error);
    //throw new Error("Error in response: " + error.message);
  }
}

carBrand.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex];
  const numberAttribute = parseInt(selectedOption.getAttribute("number"));
  //console.log(`id===>${numberAttribute + 1}+car brand`);
  try {
    const response = await fetch(getAllCarMakersLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      carMakerModel.data = responseData.data;
      carModel.innerHTML = "";

      carMakerModel.data.forEach((model, index) => {
        for (let i = 0; i < carMakerModel.data[index].cars_model.length; i++) {
          let myOption = document.createElement("option");

          myOption.setAttribute(
            "value",
            carMakerModel.data[numberAttribute].cars_model[i].id
          );

          myOption.textContent =
            carMakerModel.data[numberAttribute].cars_model[i].name;
          carModel.appendChild(myOption);
        }
      });

      console.log("Successfully get Car Maker modelName changed");
    } else {
      console.log("Network response was not OK: " + response.status);
    }
  } catch (error) {
    console.log("Network response was not OK: " + error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var currentYear = new Date().getFullYear();
  for (var year = 2000; year <= currentYear; year++) {
    var option = document.createElement("option");
    option.value = year;
    option.text = year.toString();
    // console.log(option.text);
    yearSelect.add(option);
  }
});

let carTypesModel = {
  data: [
    {
      id: 1,
      name: "سيدان",
      status: "Active",
      price_normal: "50",
      price_premium: "75",
      before_price_normal: "150",
      discount_price_normal: "50",
      discount_price_premium: "250",
      before_price_premium: "50",
    },
  ],
};

async function getCarType() {
  //accountToken = window.localStorage.getItem("token");
  try {
    const response = await fetch(getCarTypesLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accountToken}`,
      },
      // body: JSON.stringify({}),
    });

    if (response.ok) {
      const responseData = await response.json();
      carTypesModel.data = responseData.data;
      carTypesModel.data.forEach((model, index) => {
        //typeOfCar selector
        //console.log(`carName##` + carMakerModel.data[index].name);
        //carBrand.innerHTML = `<option value=${carMakerModel.data[index].name}>${carMakerModel.data[index].name}</option>`;
        let myOption = document.createElement("option");
        myOption.setAttribute("value", carTypesModel.data[index].id);
        myOption.value = carTypesModel.data[index].id;
        myOption.textContent = carTypesModel.data[index].name.toString();
        typeOfCar.add(myOption);
        // console.log(`id===> ${carTypesModel.data[index].id} car type`);
        //myOption.textContent = carMakerModel.data[index].name;
        //carBrand.appendChild(myOption);
      });

      // });
      console.log("Successfully get Car Types");
    } else {
      console.log("Network response was not OK: " + response.status);
      //throw new Error("Network response was not OK");
    }
  } catch (error) {
    console.log("Network response was not OK: " + error);
    //throw new Error("Error in response: " + error.message);
  }
}

// const notification = document.getElementById("notification_upload_complete");
// function showImageNotification(input) {
//   if (input.files && input.files[0]) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       // Update the UI or display a notification message
//       notification.innerHTML = `<p>Image selected: <img src="${e.target.result}" alt="Selected Image"></p>`;
//     };

//     reader.readAsDataURL(input.files[0]);
//   }
// }
const uploadCompleteFront = document.getElementById("upload_complete_front");
const uploadCompleteBack = document.getElementById("upload_complete_back");
const uploadCompleteRight = document.getElementById("upload_complete_right");
const uploadCompleteLeft = document.getElementById("upload_complete_left");
const uploadCompleteInSide = document.getElementById("upload_complete_inSide");
const upload_complete_IdA = document.getElementById("upload_complete_IdA");
const upload_complete_IdB = document.getElementById("upload_complete_IdB");
const upload_complete_LicenseCarA = document.getElementById(
  "upload_complete_LicenseCarA"
);
const upload_complete_LicenseCarB = document.getElementById(
  "upload_complete_LicenseCarB"
);
const upload_complete_LicenseA = document.getElementById(
  "upload_complete_LicenseA"
);
const upload_complete_LicenseB = document.getElementById(
  "upload_complete_LicenseB"
);
const upload_complete_Criminal = document.getElementById(
  "upload_complete_Criminal"
);
const upload_complete_Avatar = document.getElementById(
  "upload_complete_Avatar"
);

function validateFileFrontCar() {
  if (frontCar.value == null) {
    uploadCompleteFront.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    uploadCompleteFront.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileBackCar() {
  if (backCar.value == null) {
    uploadCompleteBack.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    uploadCompleteBack.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileRightCar() {
  if (rightCar.value == null) {
    uploadCompleteRight.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    uploadCompleteRight.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileLeftCar() {
  if (leftCar.value == null) {
    uploadCompleteLeft.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    uploadCompleteLeft.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileInSideCar() {
  if (insideCar.value == null) {
    uploadCompleteInSide.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    uploadCompleteInSide.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}

////////////////////////////////////
function validateFileIdA() {
  if (id_card_fornt.value == null) {
    upload_complete_IdA.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_IdA.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileIdB() {
  if (id_card_back.value == null) {
    upload_complete_IdB.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_IdB.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileLicenseCarA() {
  if (carLicenseFront.value == null) {
    upload_complete_LicenseCarA.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_LicenseCarA.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileLicenseCarB() {
  if (carLicenseBack.value == null) {
    upload_complete_LicenseCarB.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_LicenseCarB.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileLicenseA() {
  if (LicenseCardFront.value == null) {
    upload_complete_LicenseA.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_LicenseA.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileLicenseB() {
  if (LicenseCardBack.value == null) {
    upload_complete_LicenseB.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_LicenseB.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileCriminal() {
  if (criminal.value == null) {
    upload_complete_Criminal.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_Criminal.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}
function validateFileAvatar() {
  if (personalAvatar.value == null) {
    upload_complete_Avatar.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Please select image`;
  } else {
    upload_complete_Avatar.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Image Selected Completed`;
  }
}

frontCar.addEventListener("change", validateFileFrontCar);
backCar.addEventListener("change", validateFileBackCar);
rightCar.addEventListener("change", validateFileRightCar);
leftCar.addEventListener("change", validateFileLeftCar);
insideCar.addEventListener("change", validateFileInSideCar);
id_card_fornt.addEventListener("change", validateFileIdA);
id_card_back.addEventListener("change", validateFileIdB);
personalAvatar.addEventListener("change", validateFileAvatar);
criminal.addEventListener("change", validateFileCriminal);
LicenseCardBack.addEventListener("change", validateFileLicenseB);
LicenseCardFront.addEventListener("change", validateFileLicenseA);
carLicenseFront.addEventListener("change", validateFileLicenseCarA);
carLicenseBack.addEventListener("change", validateFileLicenseCarB);
idNumber.addEventListener("input", validateEgyptianNationalID);
idNumber.maxLength = 14;
function validateEgyptianNationalID() {
  const idValue = idNumber.value.trim(); // Trim leading/trailing spaces

  if (/^\d{14}$/.test(idValue)) {
    valid_IdNumber.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i> Valid ID Number`;
    return true;
  }
  valid_IdNumber.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #f40606;"></i> Invalid ID Number`;
  return false;
}
/////////////////////////////////////////////////////////////////////
/**Get id to all media */
var carBrandId = "";
var carModelId = "";
var typeOfCarId = "";
var yearSelectId = "";
carBrand.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex].value;
  console.log(selectedOption);
  carBrandId = selectedOption;
});
carModel.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex].value;
  console.log(selectedOption);
  carModelId = selectedOption;
});
typeOfCar.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex].value;
  console.log(selectedOption);
  typeOfCarId = selectedOption;
});
yearSelect.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex].value;
  console.log(selectedOption);
  yearSelectId = selectedOption;
});
/*#####################uploadMediaToCar #############################*/

async function uploadMediaToCar() {
  const accountToken = window.localStorage.getItem("token");

  const idNumberValue = idNumber.value.trim();
  const plateNumberValue = plateNumber.value.trim();
  const carColorValue = carColor.value.trim();

  if (!idNumberValue || !plateNumberValue || !carColorValue) {
    console.log("Please fill in all required fields.");
    return;
  }

  const data = {
    personal_avatar: personalAvatar.file,
    id_photo_front: id_card_fornt.file,
    id_photo_back: id_card_back.file,
    criminal_record: criminal.file,
    captain_license_front: LicenseCardFront.file,
    captain_license_back: LicenseCardBack.file,
    car_license_front: carLicenseFront.file,
    car_license_back: carLicenseBack.file,
    car_front: frontCar.file,
    car_back: backCar.file,
    car_right: rightCar.file,
    car_left: leftCar.file,
    car_inside: insideCar.file,
    number_personal: idNumberValue,
    car_make_id: carBrandId,
    car_model_id: carModelId,
    car_type_id: typeOfCarId,
    number_car: plateNumberValue,
    color_car: carColorValue,
    year_car: yearSelectId,
    type: "car",
    api_secret_key: api_secret_key,
  };

  try {
    const response = await fetch(uploadAllMediaLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      console.log("Successfully Upload All Media To Car");
    } else {
      console.log("Network response was not OK: " + response.status);
    }
  } catch (error) {
    console.log("Error in network response: " + error);
  }
}

saveMedia.addEventListener("click", (event) => {
  event.preventDefault();

  uploadMediaToCar();
});
