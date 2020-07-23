export class Constants {
    public projectName = 'NASSARIUS';   
    public limit20 = 20;
    public itemsPerPage = 10;
    public page = 1;
    public countryCode = 'sa';
    public dialCode = '+966';
    public language = 'en';
    public phonePattern = '^[0-9]{5,15}$';
    regex: string | RegExp = /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/;
    public emailPattern = '/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/';
    public urlPattern = 'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';
    public socialLinks:any = [
        {name:'facebook',siteUrl:'https://www.facebook.com'},
        {name:'twitter',siteUrl:'https://www.twitter.com'},
        {name:'instagram',siteUrl:'https://www.instagram.com'},
        {name:'linkedin',siteUrl:'https://www.linkedin.com'},

    ]
}