import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBIcon,
} from "mdb-react-ui-kit";

function Template({ product }) {
    return (
        <MDBContainer fluid className="mt-3 mb-3">
            <MDBRow className="justify-content-center">
                <MDBCol>
                    <MDBCard style={{boxShadow:"0 4px 16px rgba(0, 0, 0, 0.1)"}} className="text-black border-0">
                        <MDBCardImage
                            style={{objectFit: "contain", maxWidth: "200px", margin: "0 auto"}}
                            src={`data:image/jpeg;base64,${product.image}`}
                            position="top"
                            alt="Apple Computer"
                        />
                        <MDBCardBody>
                            <div className="text-center">
                                <MDBCardTitle>{product.name}</MDBCardTitle>
                                <p className="text-muted mb-4">RTX 4090</p>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <span>Рейтинг</span>
                                    <span>{product.rating}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Цена</span>
                                    <span>{product.price}</span>
                                </div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Template;