// import { useQuery } from "@apollo/client";
// import { GET_AUTHORS, GET_BOOKS } from "../graphql";

// const Login = () => {
//   const {
//     loading: authorsLoading,
//     error: authorsError,
//     data: authorsData,
//   } = useQuery(GET_AUTHORS);
//   const {
//     loading: booksLoading,
//     error: booksError,
//     data: booksData,
//   } = useQuery(GET_BOOKS);

//   if (authorsLoading || booksLoading) return <p>Loading...</p>;
//   if (authorsError || booksError)
//     return (
//       <p>Error : {authorsError ? authorsError.message : booksError?.message}</p>
//     );

//   console.log(authorsData);
//   console.log(booksData); 

//   return (
//     <div>
//       <h1>Autores</h1>
//       <ul>
//         {authorsData && authorsData.authors && authorsData.authors.map((author) => (
//           <li key={author.id}>
//             <p>Nombre: {author.name}</p>
//           </li>
//         ))}
//       </ul>
//       <h1>Libros</h1>
//       <ul>
//         {booksData && booksData.books && booksData.books.map(({ id, title }) => (
//           <li key={id}>
//             <p>Título: {title}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Login;
