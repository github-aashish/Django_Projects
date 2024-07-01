function Video(props){
    return(
        <div className="modal fade modal-lg" id="videoModal1" tabIndex="-1" aria-labelledby='exampleModalLabel' aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{module.title}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="ratio ratio-16x9">
                                            {/* <iframe src={module.video} title={module.title} allowFullScreen></iframe>*/}
                                            <video controls width="250">
                                                <source src={props.source} type="video/mp4" />
                                                Sorry Your Browser Doesn't Support Embeddeb Videos!!!
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    );
}

export default Video;