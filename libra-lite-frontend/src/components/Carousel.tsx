import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_BOOKS = gql`
query GetAllBooks {
    books {
      id
      title
      author {
        name
      }
      image {
        id
        url
      }
    }
  }
`;

export const CarouselCard = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const { data } = useQuery(GET_ALL_BOOKS);


  return (
    <div className="carousel">
      <Carousel responsive={responsive}>
        <div className="card">
          <img src={data.books.image}/>
        </div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </div>
  );
};
