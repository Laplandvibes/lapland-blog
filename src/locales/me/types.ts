// Copy for the signed-in area (/me): photo composer, own blog dashboard and
// account settings. Lives outside copy.<lang>.ts on purpose: only signed-in
// writers download it, so it ships in the /me chunk, not in the reader bundle.
//
// Placeholders in {braces} are replaced in code. Keep them in every language.

export interface MeCopy {
  composer: {
    metaTitle: string;
    h1New: string;
    h1Edit: string;
    back: string;
    pickTitle: string;
    pickHint: string;
    pickButton: string;
    addMore: string;
    removePhoto: string;
    coverBadge: string;
    makeCover: string;
    readingPhoto: string;
    privacyNote: string;
    placeLabel: string;
    placePlaceholder: string;
    dateLabel: string;
    tempLabel: string;
    tempLoading: string;
    tempNone: string;
    /** {km} = distance to the weather station */
    tempSource: string;
    /** Printed on the story card under the photo. */
    tempSourceCard: string;
    tempShow: string;
    captionLabel: string;
    captionPlaceholder: string;
    bodyLabel: string;
    bodyPlaceholder: string;
    publish: string;
    saveDraft: string;
    update: string;
    saving: string;
    uploading: string;
    errNoPhoto: string;
    errPhotoRead: string;
    errUpload: string;
    errSave: string;
    errNotSignedIn: string;
    doneTitle: string;
    doneDraftTitle: string;
    doneLead: string;
    storyMaking: string;
    shareStory: string;
    downloadStory: string;
    viewPost: string;
    copyLink: string;
    copied: string;
    addNext: string;
    myBlog: string;
  };
  dashboard: {
    metaTitle: string;
    h1: string;
    yourPage: string;
    nameLabel: string;
    namePlaceholder: string;
    editName: string;
    editAddress: string;
    save: string;
    cancel: string;
    handleRule: string;
    handleTaken: string;
    addPhoto: string;
    emptyTitle: string;
    emptyBody: string;
    loading: string;
    loadError: string;
    draft: string;
    published: string;
    hidden: string;
    untitled: string;
    edit: string;
    view: string;
    delete: string;
    confirmDelete: string;
    deleteFailed: string;
    settings: string;
    signOut: string;
  };
  settings: {
    metaTitle: string;
    h1: string;
    back: string;
    lead: string;
    account: string;
    email: string;
    address: string;
    memberSince: string;
    entries: string;
    signInTitle: string;
    signInBody: string;
    changeEmailTitle: string;
    changeEmailBody: string;
    exportTitle: string;
    exportBody: string;
    exportButton: string;
    deleteTitle: string;
    deleteBody: string;
    deleteButton: string;
    emailButton: string;
    signOut: string;
    /** Mail templates. {email} {handle} are filled in. Written in this language. */
    mailExportSubject: string;
    mailExportBody: string;
    mailDeleteSubject: string;
    mailDeleteBody: string;
    mailChangeSubject: string;
    mailChangeBody: string;
  };
}
