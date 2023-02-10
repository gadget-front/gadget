import { useParams } from "react-router-dom";

function BoardDetail(props){
    let {id} = useParams();
    return(
        <div>
            상세페이지 {id}
        </div>
    );
}

export default BoardDetail;