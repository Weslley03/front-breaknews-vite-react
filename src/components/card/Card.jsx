import { TextLimit } from "../textLimit/textLimit";
import { CardBody, CardContainer, CardHeader, CardFooter } from "./CardStyled";

export function Card(props) {
  return (
    <CardContainer>
      <CardBody>
        <div>
          <CardHeader top={props.top}>
            <h2>{props.title}</h2>
            <TextLimit text={props.text} limit={150} />
          </CardHeader>

          <CardFooter>
            <section>
              <i className="bi bi-heart"></i>
              <span>{props.likes?.length}</span>
            </section>

            <section>
              <i className="bi bi-chat-dots"></i>
              <span>{props.comments?.length}</span>
            </section>
          </CardFooter>
        </div>
        <img src={props.banner} alt="imagem" />
      </CardBody>
    </CardContainer>
  );
}
