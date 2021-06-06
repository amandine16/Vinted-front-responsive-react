import { Link } from "react-router-dom";
import logoVinted from "../assets/img/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../containers/SignUp";
import Login from "../containers/Login";
import { useHistory } from "react-router-dom";

const Header = ({
  userToken,
  setUser,
  filters,
  setFilters,
  errorMessage,
  setErrorMessage,
  modalLogin,
  modalSignUp,
  setModalLogin,
  setModalSignUp,

  fromModal,
  setFromModal,
}) => {
  const history = useHistory();

  // FUNCTION FOR FILTERS
  const handleChange = (e) => {
    const newFilters = { ...filters };
    newFilters.search = e.target.value;
    console.log(newFilters);
    setFilters(newFilters);
  };

  const handleClik = (typeModal) => {
    if (typeModal === "signUp") {
      modalSignUp ? setModalSignUp(false) : setModalSignUp(true);
    } else if (typeModal === "login") {
      modalLogin ? setModalLogin(false) : setModalLogin(true);
    }
  };

  const sellArticle = () => {
    userToken
      ? history.push("/publish")
      : // OPEN MODAL LOGIN
        setModalLogin(true);
    // SEND ALL INFO OFFER pour être redirigé ensuite, une fois connecté, vers ma page d'offre
    const newFromModal = { ...fromModal };
    newFromModal.from = "vendre";
    newFromModal.infoOffer = "";
    setFromModal(newFromModal);
  };

  // RETURN //
  return (
    <div className="Header">
      <div className="topHeader">
        <Link to="/">
          <div className="logo-vinted">
            <img src={logoVinted} alt="logo Vinted" />
          </div>
        </Link>
        {/* SEARCH */}
        <div className="input-search">
          <input
            type="text"
            value={filters.search}
            onChange={handleChange}
            placeholder="Rechercher des articles"
          />
          <FontAwesomeIcon icon="search" />
        </div>
        <div className="connexion-container">
          {/* IF TOKEN EXIST => BTN DECONNEXION*/}
          {userToken ? (
            <button
              className="btn btn-deconnexion"
              onClick={() => setUser(null)}
            >
              Deconnexion
            </button>
          ) : (
            <>
              <button
                className="btn btn-green btn-signup-header"
                onClick={() => handleClik("signUp")}
              >
                S'inscrire
              </button>
              <div className="responsive">
                <div onClick={() => handleClik("signUp")}>
                  <FontAwesomeIcon
                    icon="user-plus"
                    className="btn-signup-header"
                  />
                </div>
                <div onClick={() => handleClik("login")}>
                  <FontAwesomeIcon icon="user" className="btn-login-header" />
                </div>
                <div onClick={() => handleClik("login")}>
                  <FontAwesomeIcon
                    icon="cash-register"
                    className="btn-buy-header margin"
                    onClick={sellArticle}
                  />
                </div>
              </div>

              <button
                className="btn btn-green btn-login-header"
                onClick={() => handleClik("login")}
              >
                Se connecter
              </button>
            </>
          )}

          {/*  BUTTON SELL ARTICLE */}
          {/* <div className="btn btn-buy btn-header"> */}
          <button
            className="btn btn-green btn-buy-header"
            onClick={sellArticle}
          >
            Vends tes articles
          </button>
          {/* </div> */}
        </div>
      </div>

      {/* MODAL */}
      {modalSignUp && (
        <SignUp
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setModalSignUp={setModalSignUp}
          setModalLogin={setModalLogin}
        />
      )}
      {modalLogin && (
        <Login
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setModalLogin={setModalLogin}
          setModalSignUp={setModalSignUp}
          fromModal={fromModal}
          setFromModal={setFromModal}
        />
      )}
    </div>
  );
};

export default Header;
