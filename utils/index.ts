import { DocumentData, DocumentSnapshot } from "firebase/firestore";

/**
 * Returns user friendly error messages
 * @param {string} error - error search param from url (domain.com/?error={error_param})
 */
export const getUserFriendyErrorText = (error: string): string => {
  switch (error) {
    case "user_is_not_registered":
      return "You have to sign up first blablabla";
  }

  return "Unknown error";
};

/**
 * Returns doc`s fields and id
 * @param {DocumentSnapshot<DocumentData, DocumentData>} doc - doc element returned by firebase
 */
export const getDataFromDoc = (
  doc: DocumentSnapshot<DocumentData, DocumentData>
) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};
