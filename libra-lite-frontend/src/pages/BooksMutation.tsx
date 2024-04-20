// import { useQuery, useMutation } from "@apollo/client";
// import { GET_AUTHORS, ADD_BOOK } from "../graphql/mutation/bookMutation";
// import { Author} from "../__generated__/graphql";
// import { useForm } from "react-hook-form";


// const AddBookForm = () => {
//   const { register, handleSubmit } = useForm();
//   const [addBook] = useMutation(ADD_BOOK);
//   const {
//     data: authorsData,
//   } = useQuery(GET_AUTHORS);

//   const onSubmit = async (formData) => {
//     try {
//       const { data } = await addBook({
//         variables: {
//           data: {
//             title: formData.title,
//             edition: formData.edition,
//             author: { connect: { id: formData.authorId } }, 
//             quantity: formData.quantity,
//             price: formData.price,
//           },
//         },
//       });
//       console.log("Book added:", data.createBook);
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>
//         Title:
//         <input type="text" name="title" ref={register} />
//       </label>
//       <label>
//         Edition:
//         <input type="text" name="edition" ref={register} />
//       </label>
//       <label>
//         Author:
//         <select name="authorId" ref={register}>
//           {authorsData?.authors.map((author: Author) => (
//             <option key={author.id} value={author.id}>
//               {author.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Quantity:
//         <input type="number" name="quantity" ref={register} />
//       </label>
//       <label>
//         Price:
//         <input type="number" name="price" ref={register} />
//       </label>
//       <button type="submit">Add Book</button>
//     </form>
//   );
// };
// export default AddBookForm;
