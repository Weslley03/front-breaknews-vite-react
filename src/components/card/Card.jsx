import { TextLimit } from "../textLimit/textLimit";
import { CardBody, CardContainer, CardHeader, CardFooter } from "./CardStyled";
import { Link } from "react-router-dom";

export function Card({top, title, text, likes, comments, banner, actions= false, id }) {
  return (
    <CardContainer>
      <CardBody>
        <div>
          <CardHeader $top={top}>
            {actions && 
            <span>
            <Link to={`/manage-news/edit/${id}`}> 
              <i className="bi bi-pencil-square"></i>
            </Link>

            <Link to={`/manage-news/delete/${id}`}> 
              <i className="bi bi-trash3"></i>
            </Link>
            </span>
            }
            <h2>{title}</h2>
            <TextLimit text={text} limit={150} />
          </CardHeader>

          <CardFooter>
            <section>
              <i className="bi bi-heart"></i>
              <span>{likes?.length}</span>
            </section>

            <section>
              <i className="bi bi-chat-dots"></i>
              <span>{comments?.length}</span>
            </section>
          </CardFooter>
        </div>
        <img src={banner} alt="imagem" />
      </CardBody>
    </CardContainer>
  );
}
