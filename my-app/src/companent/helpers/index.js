
export const validate = (name, value) => {
    let error = "";
  
    switch (name) {
      case "text":
        if (value.length < 3) {
          error = "Text must be at least 3 characters";
        }
        break;
      case "infor":
        if (value.length < 10) {
          error = "Info must be at least 10 characters";
        }
        break;
      case "qiymet":
        if (value.length < 1) {
          error = "Price must be at least 1 character";
        }
        break;
      default:
        break;
    }
  
    return error;
  };
  