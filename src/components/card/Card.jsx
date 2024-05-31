import { TextLimit } from "../textLimit/textLimit";
import { CardBody, CardContainer, CardFooter  } from "./CardStyled";

export function Card(props) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{props.title}</h2>
                    <img src={props.banner} alt="imagem"/>
                </div>
                <TextLimit text={props.text} limit={150}/>
            </CardBody>
           
           <CardFooter>
                <div>
                    <i className="bi bi-heart"></i>
                    <span>{props.likes}</span>
                </div>
                
                <div>
                    <i className="bi bi-chat-dots"></i>
                    <span>{props.comments}</span>
                </div>
           </CardFooter>
        </CardContainer>
    )
}