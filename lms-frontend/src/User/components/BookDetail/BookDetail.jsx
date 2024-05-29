import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../../../services/BookService";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { createBorrowDetail, getBorrowDetail } from "../../../services/BorrowDetailService";
import { createBorrow } from "../../../services/BorrowService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";



export default function BookDetail() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [accountID, setAccountID] = useState(null);
  const navigator = useNavigate();
  const [borrowDetails, setBorrowDetails] = useState([])
  const [bookItemId, setBookItemID] = useState(null);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store)
  
    useEffect(()=>{
      if(jwt){
        dispatch(getUser(jwt))
      }
    },[jwt, auth.jwt])

  useEffect(() => {
    if (id) {
      getBook(id)
        .then((response) => {
          setBook(response.data);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  const addToCart = (event) => {
    event.preventDefault();
    console.log(checkBookItem())
    if(checkBookItem()){
        console.log(auth.user?.accountID)
        let borrow = {
            accountID: auth.user?.accountID
        }
       createBorrow(borrow).then((response)=>{
            let borrowDetail = {
              borrow: {
                borrowId: response.data.borrowId
              },
              bookItem: 
                  book.bookItems.find((item) => { item.status === 0
                  console.log(item.bookItemId);
                  return item.bookItemId;
                })
                
              
            };
            console.log(borrowDetail.bookItem.bookItemId)
            createBorrowDetail(borrowDetail).then((response)=>{
            checkBookItem()
            console.log(response.data)
            }).catch((error)=>{
            console.error(error)
            })
            console.log(response.data)
       }).catch((error)=>{
            console.error(error)
         
       }) 
    }
    navigator("/cart");
  }
    function checkBookItem(){
        console.log(book.bookItems)
        if(book.bookItems){
                return book.bookItems.some((item) => {
                        if (item.status === 0) {
                            return true;
                        }
                        return false;
                    });
        }
        return false;
    }
return (
  <div className="bg-white">
    <div className="pt-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
            <img
              src={book?.picture}
              alt={book?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        {/* Product info */}
        <div
          className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7x1 lg:px-8
            lg:pb-24"
        >
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">
              {book?.title}
            </h1>
            <h1 className="text-lg lg:text-x1 text-gray-900 opacity-60 pt-1">
              {book?.authors.length > 0
                ? book?.authors
                    .map((author) => (
                      <a
                        href={`#author/${author.authorId}`}
                        key={author.authorId}
                      >
                        {author.authorName}
                      </a>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])
                : "No authors"}
            </h1>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <Rating name="read-only" value={5.5} readOnly />
                <p className="opacity-50 text-sm">500 Ratings</p>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Reviews
                </p>
              </div>
            </div>
            <h2 className="">Product information</h2>
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="text-gray-600 font-semibold">In Stock:</p>
              <p className="opacity-50 text-gray-600 font-semibold">
                {" "}
                {book?.bookItems.filter((item) => item.status === 0).length > 0
                  ? book?.bookItems.filter((item) => item.status === 0).length
                  : "Out of Stock"}
              </p>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div className="mt-10">
                <p className="text-sm text-gray-600">
                  Publisher: {book?.publisher.publisherName}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Publish Year: {book?.publishYear?.substring(0, 4)}
                </p>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Categories
                </h3>

                <div className="mt-2">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {book?.categories.map((category) => (
                      <li key={category.categoryId} className="text-gray-400">
                        <a
                          href={`#category/${category.categoryId}`}
                          className="text-gray-600"
                        >
                          {category.categoryName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{book?.description}</p>
                </div>
              </div>
            </div>
            <form className="mt-10">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={ 
                    addToCart
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
);}
