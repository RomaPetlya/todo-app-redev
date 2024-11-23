import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./noTasks.css"

export const NoTasks = () => {
    return (
        <>
        <div className="no-tasks">
            <h2>No tasks to show</h2>
            <FontAwesomeIcon size='4x' icon={faFaceSadTear} />
        </div>
           
        </>
    )
}