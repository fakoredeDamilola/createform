import { routes } from "./routes";

const headerLinks = [
  {
    title: "Home",
    route: routes.home,
  },
  {
    title: "Contact",
    route: routes.contact,
  },
  {
    title: "Home",
    route: routes.home,
  },
  {
    title: "Home",
    route: routes.home,
  },
];

const DashboardTabs = ["Forms"];

const DashboardHeaderTabs = [
  { text: "Create", link: "createForm" },
  { text: "Results", link: "result" },
];

const resultTabs = ["Insight", "Summary", "Responses"];

const formTabHeaders = [
  "Responses",
  "Most Recent response",
  "Updated",
  "Integrations",
  "",
];

enum DeviceOrientation {
  mobile = "MOBILE",
  desktop = "DESKTOP",
}

enum QuestionType {
  short_text = "Short Text",
  long_text = "Long Text",
  multiple_choice = "Multiple Choice",
  multiple_selection = "Multiple Selection",
  statement = "Statement",
  email = "Email",
  number = "Number",
  boolean = "Boolean",
}

enum FormItemType {
  QUESTION = "QUESTION",
  STATIC = "STATIC",
}

enum FormStaticType {
  START = "START",
  END = "END",
}

enum OptionLabel {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

enum ResponseType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

enum BooleanLabel {
  YES = "Y",
  NO = "N",
}

enum EncryptionType {
  NONE = "None",
  EMAIL = "Email",
}

export {
  headerLinks,
  DashboardTabs,
  formTabHeaders,
  DashboardHeaderTabs,
  resultTabs,
  DeviceOrientation,
  QuestionType,
  OptionLabel,
  BooleanLabel,
  EncryptionType,
  ResponseType,
  FormItemType,
  FormStaticType,
};
