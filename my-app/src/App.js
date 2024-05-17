import logo from './logo.svg';
import './App.css';
import{ useEffect, useState }from 'react'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { Prev } from 'react-bootstrap/esm/PageItem';
function App() {
  const[net,setnet]= useState([])
  useEffect(()=>{
    const getcomments =async () =>{
      const res = await axios.get(`https://dummyjson.com/products?limit=6`)
      .then((Responses)=>{
          console.log(Responses.data.products)
         setnet(Responses.data.products)})
    
         
      }
      getcomments()
},[])

const fetchComments= async (skip) =>{

  const res = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=4`);

  const data = await res.data.products;
  return(data)

}


const handlepageclick= async (data)=>{

  console.log(data.selected);

  const skip= data.selected *6;

  const commentsformserver = await fetchComments(skip)
  
  setnet(commentsformserver)

}
  return (
    <div className="App">
      <div>
      {net.map((value)=>
      
      <Card style={{ width: '18rem', borderRadius:"15px", backgroundColor:"black",color:"white",float:"left",height:"500px",marginTop:"30px",marginLeft:"50px", boxShadow: "0 4px 8px 0 rgba(1, 1, 1, 0.9), 0 6px 20px 0 rgba(1, 3, 1, 0.35)",padding:"10px" }}>
        <Card.Title>{value.category}</Card.Title>
      <Card.Img style={{borderRadius:"100px"}} variant="top" src={value.images} />
      <Card.Body>
        <Card.Title>{value.brand} / {value.title}
        </Card.Title>
        <Card.Text>
<b>DESCRIPTION :</b> {value.description}<br></br>
       <b>PRICE :</b> {value.price}<br></br>
      <b>RATING :</b> {value.rating}<br></br>
          </Card.Text>
       </Card.Body>

       
    </Card>
    
    )}
    
    </div>


    <div style={{float:"inline-end",marginTop:"40px",marginRight:"50px"}}>
      <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    pageCount={10}
    marginPagesDisplayed={2}
    onPageChange={handlepageclick}
    containerClassName={'pagination'}
    pageClassName={'page-item'}
    pageLinkClassName={'page-link'}
    previousClassName={'page-item'}
    previousLinkClassName={'page-link'}
    nextClassName={'page-item'}
    nextLinkClassName={'page-link'}
    breakClassName={'page-item'}
    breakLinkClassName={'page-link'}
    activeClassName={'active'}
/>
    </div>
    </div>
    
  );
}

export default App;
