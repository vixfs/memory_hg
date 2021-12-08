function generateLine() {
    const progr_line = `
        <div class="container_progress_line">
            <div class="container">
                <div class="row">
                    <div class="col row">
                        <div class="back_arrow" onClick='location.href="#close"'>
                            <div class="back_arrow_icon"></div>
                        </div>
                    </div>
<!--                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 text-center">-->
                    <div class="col-7 text-center align-items-center">
                        <div class="row align-items-center cont_wrong_correct_answer">
                            <div class="col">
                                <div class="row wrong_answers">
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                </div>
                            </div>
                            <div class="col text-center level_cont">
                                <span class="level "></span>
                            </div>
                            <div class="col">
                                <div class="row correct_answers justify-content-end">
                                    <div class="correct_answer"></div>
                                    <div class="correct_answer"></div>
                                    <div class="correct_answer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col row justify-content-end">
                        <span class="points"></span> 
                    </div>
                </div>
                <div class="row row_2">
                    <div class="col align-items-center row">
                        <span class="time_icon"></span>
                        <span class="time"></span>
                    </div>
<!--                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 align-items-center text-center">-->
                    <div class="col-7 align-items-center text-center">
                        <div class="row text-center min_max_points_line">
                            <div class="col row align-items-center">
                                <span class="min_points_icon"></span>
                                <span class="min_points"></span>
                            </div>
                            <div class="col row justify-content-center align-items-center col_level_text">
                                <span class="level_text">Уровень </span>
                            </div>
                            <div class="col row justify-content-end align-items-center">
                                <span class="max_points"></span>
                                <span class="max_points_icon"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col align-items-center row justify-content-end">
                        <span class="record"></span> 
                        <span class="record_icon"></span> 
                    </div>            
                </div>
            </div>
        </div>
        <div class="progressBar">
            <div></div>
        </div>           

`;
    document.querySelector(".progress_line").innerHTML = progr_line;

}