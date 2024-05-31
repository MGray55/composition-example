type TtaExport = {
    ApplicationName: string;
};

type Labels = {
    TtaExport: TtaExport;
};

// type "Application Labels" = {
//     TtaExport: TtaExport
// }

type Label = {
    'Application Labels';
};

type DataResponse = {
    Currencies: object;
    Labels: Label;
};

export { DataResponse };
