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
