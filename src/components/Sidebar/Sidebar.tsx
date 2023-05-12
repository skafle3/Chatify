import type { ConversationInfo } from "../../library";

import { Menu } from "@mui/material";
import { signOut } from "firebase/auth";
import { collection, orderBy, where, query } from "firebase/firestore";
import { useState } from "react";
import { FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useCollectionQuery } from "../../hooks";
import {
  DEFAULT_AVATAR,
  firebaseAuth,
  firebaseDb,
  IMAGE_PROXY,
  useUserStore,
} from "../../library";
import { MiniSpinner } from "../MiniSpinner/MiniSpinner";
import {
  SideBar,
  Navbar,
  Wrapper,
  ProfileButton,
  ProfilePicture,
  ChatButton,
  PrimaryContainer,
  SecondaryContainer,
  ShowProfileButton,
  SignOutButton,
  Container,
  Text,
  SelectConversationButton,
} from "./style";

import { CreateConversation, Profile, SelectConversation } from ".";

export function Sidebar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useUserStore((state) => state.currentUser);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, error, loading } = useCollectionQuery(
    "conversations",
    query(
      collection(firebaseDb, "conversations"),
      orderBy("updatedAt", "desc"),
      where("users", "array-contains", currentUser?.uid)
    )
  );
  console.log("63");
  console.log(data?.size);
  console.log(error)
  console.log('*****')
  return (
    <SideBar>
      <Navbar>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "calc(20 / 16 * 1rem",
            fontWeight: 500,
            color: "#24292f",
          }}
        >
          Chatify
        </Link>

        <Wrapper>
          <PrimaryContainer>
            <ChatButton
              aria-label="New conversation"
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlus style={{ fontSize: "1.1rem" }} />
            </ChatButton>
            <CreateConversation
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </PrimaryContainer>

          <SecondaryContainer>
            <ProfileButton
              aria-controls={open ? "unauthenticated nav menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <ProfilePicture
                src={
                  currentUser?.photoURL
                    ? IMAGE_PROXY(currentUser.photoURL)
                    : DEFAULT_AVATAR
                }
                alt=""
              />
            </ProfileButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <ShowProfileButton onClick={() => setIsProfileOpen(true)}>
                <FiUser style={{ marginRight: "5px", fontSize: "1.3rem" }} />{" "}
                Profile
              </ShowProfileButton>

              <SignOutButton onClick={() => signOut(firebaseAuth)}>
                <FiLogOut style={{ marginRight: "5px", fontSize: "1.2rem" }} />{" "}
                Sign out
              </SignOutButton>
            </Menu>
            <Profile
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
            />
          </SecondaryContainer>
        </Wrapper>
      </Navbar>

      {loading ? (
        <Container>
          <MiniSpinner />
        </Container>
      ) : error ? (
        <Container>
          <Text>Something went wrong here</Text>
        </Container>
      ) : data?.empty ? (
        <Container>
          <Text>No conversation found</Text>
          <SelectConversationButton onClick={() => setIsModalOpen(true)}>
            Create one
          </SelectConversationButton>
        </Container>
      ) : (
        <>
          {data?.docs.map((item) => (
            <SelectConversation
              key={item.id}
              conversation={item.data() as ConversationInfo}
              conversationId={item.id}
            />
          ))}
        </>
      )}
    </SideBar>
  );
}
