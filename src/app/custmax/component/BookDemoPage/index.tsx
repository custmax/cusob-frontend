import CustomerComments from "@/app/custmax/component/Price/component/CustomerComments";
import Tail from "@/app/custmax/component/HomePageMain/component/Tail";
import BookDemoCases from "@/app/custmax/component/BookDemoPage/BookDemoCases";
import BookDemoForm from "@/app/custmax/component/BookDemoPage/BookDemoForm";

const BookDemoPage = () => {
    return (
        <div>
            <BookDemoForm />
            <BookDemoCases />
            <CustomerComments />
            <Tail />
        </div>
    )
}

export default BookDemoPage;