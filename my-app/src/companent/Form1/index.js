// import { useState } from "react";
// import uniqid from "uniqid";
// import { validate } from "../helpers";


//  export function Form1() {

//   const [list, setList] = useState([])

//   const [todo, setTodo] = useState({
//     text: '',
//     infor: '',
//     qiymet:'',
//     foto:'',
//     completed: false,
//     id: 0
//   })

//   const [errors, setErrors] = useState({
//     text: '',
//     infor: '',
//     qiymet:'',
//     foto:'',
    
//   });


// const handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
  
//     setTodo({
//       ...todo,
//       [name]: value
//     });
  
//     const error = validate(name, value);
  
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (errors.text.length > 0 && errors.infor.length > 0 && errors.qiymet.length > 0) {
//       alert('Something went wrong')
//     } else {
      
//       setList([
//         ...list,
//         {
//           ...todo,
//           id: uniqid(),
//         },
//       ]);

//       setTodo({
//         text: "",
//         infor: "",
//         qiymet: "",
//         completed: false,
//       });
//     }

//   }

//   function toggle(id) {
//     const element = list.find(item => item.id === id)
//     element.completed ? element.completed = false : element.completed = true
//     setList([...list])
//   }

//   return (
//     <section>
//     <form  className="form1" onSubmit={handleSubmit}>
//       <div className="div1">
//         <label htmlFor="text">Text: </label>
//         <input
//           name="text"
//           defaultValue={todo.text}
//           value={todo.text}
//           onChange={handleChange}
//         />
//         {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}
//       </div>
//       <div>
//         <label htmlFor="infor">Infor: </label>
//         <input
//           name="infor"
//           defaultValue={todo.infor}
//           value={todo.infor}
//           onChange={handleChange}
//         />
//         {errors.infor && <p style={{ color: "red" }}>{errors.infor}</p>}
//       </div>
//       <div>
//         <label htmlFor="qiymet">Qiymet: </label>
//         <input
//           type="number"
//           name="qiymet"
//           defaultValue={todo.qiymet}
//           value={todo.qiymet}
//           onChange={handleChange}
//         />
//         {errors.qiymet && <p style={{ color: "red" }}>{errors.qiymet}</p>}
//       </div>
  
//       <button type="submit">Submit</button>
  
//       {list.map((item) => (
//         <div
//           onClick={() => toggle(item.id)}
//           style={{
//             textDecoration: item.completed ? "line-through" : 'none',
//             opacity: item.completed ? .7 : 1
//           }}
//           key={item.id}
//         >
//           <h2>Mehsulun adi : {item.text} </h2>
//           <h5>Mehsulun infosu :{item.infor} </h5>
//           <p>Mehsulun qiymeti: {item.qiymet}$</p>
//         </div>
//       ))}
//     </form>

//     </section>
//   );
  
 
// }

// export default Form1;







import { useState } from "react";
import uniqid from "uniqid";
import { validate } from "../helpers";

export function Form1() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    text: '',
    infor: '',
    qiymet: '',
    photo: null, // Dosya için state ekledik
    completed: false,
    id: 0
  });
  const [errors, setErrors] = useState({
    text: '',
    infor: '',
    qiymet: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    // Eğer dosya yüklenmişse, dosyayı state'e ekleyelim
    if (files) {
      setTodo({
        ...todo,
        [name]: files[0]
      });
    } else {
      setTodo({
        ...todo,
        [name]: value
      });
    }

    const error = validate(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hata kontrolü
    if (errors.text || errors.infor || errors.qiymet) {
      alert('Something went wrong');
    } else {
      setList([
        ...list,
        {
          ...todo,
          id: uniqid(),
        },
      ]);

      // State'i temizleyelim
      setTodo({
        text: "",
        infor: "",
        qiymet: "",
        photo: null,
        completed: false,
      });
    }
  };

  function toggle(id) {
    const element = list.find(item => item.id === id);
    element.completed ? element.completed = false : element.completed = true;
    setList([...list]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text: </label>
        <input
          name="text"
          value={todo.text}
          onChange={handleChange}
        />
        {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}
      </div>
      <div>
        <label htmlFor="infor">Infor: </label>
        <input
          name="infor"
          value={todo.infor}
          onChange={handleChange}
        />
        {errors.infor && <p style={{ color: "red" }}>{errors.infor}</p>}
      </div>
      <div>
        <label htmlFor="qiymet">Qiymet: </label>
        <input
          type="number"
          name="qiymet"
          value={todo.qiymet}
          onChange={handleChange}
        />
        {errors.qiymet && <p style={{ color: "red" }}>{errors.qiymet}</p>}
      </div>
      <div>
        <label htmlFor="photo">Photo: </label>
        <input
          type="file"
          accept="image/*" // Sadece resim dosyalarını kabul eder
          name="photo"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      {list.map((item) => (
        <div
          onClick={() => toggle(item.id)}
          style={{
            textDecoration: item.completed ? "line-through" : 'none',
            opacity: item.completed ? .7 : 1
          }}
          key={item.id}
        >
          <h2>Mehsulun adi : {item.text} </h2>
          <h5>Mehsulun infosu :{item.infor} </h5>
          <p>Mehsulun qiymeti: {item.qiymet}$</p>
          
          {item.photo && <img src={URL.createObjectURL(item.photo)} alt="Product" />}
        </div>
      ))}
    </form>
  );
}

export default Form1;
