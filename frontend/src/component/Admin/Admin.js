import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { BsPen } from "react-icons/bs";
import Model from "react-modal";
import {
  AddCase,
  setCases,
  updateCases,
  deleteCase,
} from "../../reducer/cases/index";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Link } from "react-router-dom";
const Admin = () => {
  const [num, setNum] = useState(1);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [userId, setUserId] = useState("");
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  // ------------------------------------------------

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setCase_Image(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // ------------------------------------------------

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };
  // ------------------------------------------------
  const updateCaseById = async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/cases/${id}`, {
        case_image,
        title,
        case_description,
        TheAmountRequired,
        category,
      });
      dispatch(updateCases(result.data.results));
      getAllCases();
      setUpdateIsOpen(false);
      navigate(`/admin`);
    } catch (error) {
      console.log(error.response);
    }
  };
  // ------------------------------------------------

  const deleteCseById = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getAllCases();
      //   navigate(`/allcases`);
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------------------------------

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { cases: state.casesReducer.cases, token: state.loginReducer.token };
  });

  // ------------------------------------------------
  const addNewCase = () => {
    axios
      .post(
        "http://localhost:5000/cases",
        { category, case_image, title, case_description, TheAmountRequired },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )

      .then((result) => {
       
        dispatch(
          AddCase({
            category,
            case_image,
            title,
            case_description,
            TheAmountRequired,
          })
          
        );
        getAllCases()
        setMessage("the case has been created successfully");
        setModelIsOpen(false);
        navigate(`/admin`);

        // navigate(`/allcases`);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCases();
  }, []);
  // ------------------------------------------------
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customStyles2 = {
    content: {
    //   background: "rgba(yellow, 0, 0, 0.7)",
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      {" "}
      <br />
      <br />
      <br />
      <AiOutlinePlusCircle
        onClick={() => setModelIsOpen(true)}
        className="plus"
      ></AiOutlinePlusCircle>
      <br />
      <br />
      <br />
      <table className="table">
        {" "}
        <tr className="head">
          <th>id</th>
          <th> category</th>
          <th>title</th>
          <th>amount</th>
          <th>image</th>
          <th>description</th>

          <th>donation</th>
          <th>donor</th>
          <th>Operations</th>
        </tr>{" "}
        {state.cases &&
          state.cases.map((element, i) => {
            return (
              <tr key={i}>
                <td className="allcasesImage">{element.id}</td>
                <td className="allcasesImage">{element.category}</td>
                <td className="allcasesTitle">{element.title}</td>
                <td className="TheAmountReguired">
                  {element.TheAmountRequired} $
                </td>
                <td className="allcasesImage">{element.case_image}</td>
                <td className="allcasesImage">{element.case_description}</td>

                <td className="allcasesImage">{element.donations}</td>
                <td className="allcasesImage">{element.donor}</td>
                <td className="allcasesImage">
                  {" "}
                  <AiOutlineDelete
                    className="delete"
                    onClick={() => deleteCseById(element.id)}
                  />
                  <BsPen
                    className="update"
                    onClick={() => {
                      setUpdateIsOpen(true);
                      setCaseId(element.id)
                    }}
                  />
                </td>
                <div>
                  <Model
                    style={customStyles2}
                    isOpen={updateIsOpen}
                    onRequestClose={() => setUpdateIsOpen(false)}
                  >
                    <input
                      type="text"
                      placeholder="category"
                      defaultValue={element.category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>{" "}
                    <br />
                    <br />
                    <input
                      type="file"
                      className="image"
                      onChange={(e) => {
                        setImageSelected(e.target.files[0]);
                      }}
                    ></input>
                    <button onClick={() => uploadImage(imageselected)}>
                      upload
                    </button>
                    <br />
                    <br />
                    <input
                      type="text"
                      placeholder="title"
                      defaultValue={element.title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>{" "}
                    <br />
                    <br />
                    <input
                      type="text"
                      placeholder="description"
                      defaultValue={element.case_description}
                      onChange={(e) => setCase_Description(e.target.value)}
                    ></input>{" "}
                    <br />
                    <br />
                    <input
                      type="text"
                      placeholder="amount"
                      defaultValue={element.TheAmountRequired}
                      onChange={(e) => setTheAmountRequired(e.target.value)}
                    ></input>{" "}
                    <br />
                    <br />
                    <button
                      className="update"
                      onClick={() => updateCaseById(caseId)}
                    >
                      update
                    </button>
                    <br />
                  </Model>
                </div>
              </tr>
            );
          })}
      </table>
      {/* <Link className="case" to="/newcase">
            <a id="new">newCase</a>
          </Link> */}
      {/* <br />
        <br />
              <br /> */}
      <div className="model">
        <Model
          isOpen={modelIsOpen}
          style={customStyles}
          onRequestClose={() => setModelIsOpen(false)}
        >
          <div className="newPage">
            <br />
            <br />
            <br />

            <>
              <input
                className="category"
                type="text"
                placeholder="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
              <br />
              <br />
              <input
                className="title"
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>{" "}
              <br />
              <br />
              <input
                className="amount"
                type="number"
                placeholder="The amount required"
                onChange={(e) => {
                  setTheAmountRequired(e.target.value);
                }}
              ></input>
              <br />
              <br />
              <input
                type="file"
                className="image"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              ></input>
              <button onClick={() => uploadImage(imageselected)}>upload</button>
              <br />
              <br />
              <textarea
                className="description"
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setCase_Description(e.target.value);
                }}
              ></textarea>
              <br />
              <br />
              <button className="new" onClick={addNewCase}>
                new Case
              </button>
            </>

            {message}
          </div>
        </Model>
      </div>
    </>
  );
};
export default Admin;
