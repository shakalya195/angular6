export interface IProperty {
    // subsriber
    routeSub?: any;
    loginSub?: any;
    categoriesSub?: any;
    categoryIdSub?: any;
    profileSub?:any;
  
    // normal variables
    url?: any;
    itemsPerPage?: number;                  // total items per page
    auth2?: any;
    isSocialLogin?: boolean;
    initialCountry?: any;
    userData?: any;
    userProfileData?:any;
    isRegistered?: boolean;
    categoryId?: string;
    image?: any;
    submitted?: boolean;
    feedId?: string;
    offset?: number;
    page?: number;
    feedListingpage?: number;
    userListingPage?: number;
    commentPage?: number;
    total?: number;
    _id?: string;
    otherUserId?: string;
    subType?: string;
    categories?: Array<string>;
    showVideo?: boolean;
    showFeed?: string;
    recommendationType?: number;
    text?: string;
    replyText?: string;
    showPass?: boolean;
    isAgree?: boolean;
    selectedVideo?: any;
    type?: number;
    loadmore?: boolean;
    index?: number;
    count?: number;
    index1?: number;
    youAreBlocked?: boolean;
    youBlocked?: boolean;
    showTabView?: boolean;
    showUsertab?: boolean;
    placeholder?: string;
    search?: string;
    disableScrollDown?: boolean;
    loader?:any;
  }
