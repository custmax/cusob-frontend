import BookDemoCases from "@/app/custmax/component/BookDemoPage/BookDemoCases";
import BookDemoForm from "@/app/custmax/component/BookDemoPage/BookDemoForm";
import CustomerComments from "@/app/custmax/component/sharedComponents/CustomerComments";
import Tail from "@/app/custmax/component/sharedComponents/Tail";

const BookDemoPage = () => {
    return (
        <div>
            <BookDemoForm />
            <BookDemoCases />
            <CustomerComments theme={"light"}/>
            <Tail theme={'dark'}/>
        </div>
    )
}

export default BookDemoPage;